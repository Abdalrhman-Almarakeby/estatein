"use server";

import { cookies } from "next/headers";
import { WithCaptcha } from "@/types";
import { getUserIpAddress } from "@/lib/ip";
import { prisma } from "@/lib/prisma";
import { createRateLimiter } from "@/lib/rate-limiter";
import { Otp, otpSchema } from "@/lib/schemas";
import { getUserAgent } from "@/lib/user-agent";
import { verifyCaptchaToken } from "@/server/services";

const MAX_VERIFY_EMAIL_ATTEMPTS = 5;
const VERIFY_EMAIL_ATTEMPTS_WINDOW = "30m";

export async function verifyEmail(data: WithCaptcha<Otp>) {
  const ip = getUserIpAddress();
  const { ua: userAgent } = getUserAgent();

  const rateLimit = createRateLimiter(
    MAX_VERIFY_EMAIL_ATTEMPTS,
    VERIFY_EMAIL_ATTEMPTS_WINDOW,
  );

  const limitKey = `email_verification_ratelimit_${ip}_${userAgent}`;

  const {
    success: rateLimitIsSuccess,
    reset,
    remaining,
  } = await rateLimit.limit(limitKey);

  if (!rateLimitIsSuccess) {
    const remainingMinutes = Math.ceil((reset - Date.now()) / (1000 * 60));

    return {
      success: false,
      message: `Too many verification attempts, please try again in ${remainingMinutes} ${remainingMinutes === 1 ? "minute" : "minutes"}.`,
    };
  }

  const { success: captchaIsSuccess } = await verifyCaptchaToken(
    data.captchaToken,
  );

  if (!captchaIsSuccess) {
    return {
      success: false,
      message: "Invalid  credentials, Please try again.",
    };
  }

  const { success: isDataValid } = otpSchema.safeParse(data);

  if (!isDataValid) {
    return {
      success: false,
      message: `Invalid credentials. Please try again. ${remaining < 3 ? `(${remaining} ${remaining === 1 ? "attempt" : "attempts"} remaining)` : ""}`,
    };
  }

  try {
    const cookieStore = cookies();

    const signupEmail = cookieStore.get("signup-email")?.value;

    if (!signupEmail) {
      return {
        success: false,
        message: "Invalid credentials. Please try again.",
      };
    }

    const user = await prisma.user.findFirst({
      where: {
        email: signupEmail,
        emailVerificationCode: data.otp,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "Invalid credentials. Please try again.",
      };
    }

    if (user.isVerified) {
      return {
        success: false,
        message: "Invalid credentials. Please try again.",
      };
    }

    if (
      user.emailVerificationCodeExpiresAt &&
      new Date() > user.emailVerificationCodeExpiresAt
    ) {
      return {
        success: false,
        message: "Token has expired. Please request a new verification email",
      };
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isVerified: true,
        emailVerificationCode: null,
        emailVerificationCodeExpiresAt: null,
      },
    });

    cookieStore.delete("signup-email");
    cookieStore.delete("verification-pending");

    return {
      success: true,
      message: "Email verified successfully.",
    };
  } catch (err) {
    return {
      success: false,
      message: "Something went wrong, please try again later.",
    };
  }
}
