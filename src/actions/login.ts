"use server";

import { compare } from "bcryptjs";
import { WithCaptcha } from "@/types";
import { createRateLimiter } from "@/lib/create-rate-limiter";
import { prisma } from "@/lib/prisma";
import { Login, loginSchema } from "@/lib/schemas";
import { getUserIpAddress } from "@/lib/utils/get-user-ip-address";
import { verifyCaptchaToken } from "@/services";

const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_ATTEMPTS_WINDOW = "30m";

export async function login(data: WithCaptcha<Login>) {
  const ip = getUserIpAddress();
  const rateLimit = createRateLimiter(
    MAX_LOGIN_ATTEMPTS,
    LOGIN_ATTEMPTS_WINDOW,
    {
      prefix: "login_ratelimit_",
    },
  );

  const {
    success: rateLimitIsSuccess,
    reset,
    remaining,
  } = await rateLimit.limit(ip);

  if (!rateLimitIsSuccess) {
    const remainingMinutes = Math.ceil((reset - Date.now()) / (1000 * 60));

    return {
      success: false,
      message: `Too many login attempts, please try again in ${remainingMinutes} ${remainingMinutes === 1 ? "minute" : "minutes"}.`,
    };
  }

  const { success: captchaIsSuccess } = await verifyCaptchaToken(
    data.captchaToken,
  );

  if (!captchaIsSuccess) {
    return {
      success: false,
      message: "Invalid login credentials, Please try again.",
    };
  }

  const { success: isDataValid } = loginSchema.safeParse(data);

  if (!isDataValid) {
    return {
      success: false,
      message: `Invalid login credentials. Please try again. ${remaining < 3 ? `(${remaining} ${remaining === 1 ? "attempt" : "attempts"} remaining)` : ""}`,
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password, Please try again.",
      };
    }

    if (!user.isVerified) {
      return {
        success: false,
        message:
          "Your account is not verified. Please check your email for the verification link.",
      };
    }

    const isPasswordValid = await compare(data.password, user.password);

    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid email or password, Please try again.",
      };
    }

    await rateLimit.resetUsedTokens(ip);

    return {
      success: true,
      message: "Login successful.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong, Please try again later.",
    };
  }
}
