"use server";

import { cookies } from "next/headers";
import { formatDistanceToNow, minutesToSeconds } from "date-fns";
import { WithCaptcha } from "@/types";
import { env } from "@/lib/env";
import { getUserIpAddress } from "@/lib/ip";
import { comparePasswords } from "@/lib/password-hasher";
import { prisma } from "@/lib/prisma";
import { createRateLimiter } from "@/lib/rate-limiter";
import { Login, loginSchema } from "@/lib/schemas";
import { getUserAgent } from "@/lib/user-agent";
import { AUTH_CONFIG } from "@/config/auth";
import { verifyCaptchaToken } from "@/server/services";

const GENERIC_ERROR = "Invalid login credentials. Please try again.";

export async function login(data: WithCaptcha<Login>) {
  try {
    const parseResult = loginSchema.safeParse(data);
    if (!parseResult.success) {
      return { success: false, message: GENERIC_ERROR };
    }

    const ip = getUserIpAddress();
    const { ua: userAgent } = getUserAgent();
    const rateLimit = createRateLimiter(
      AUTH_CONFIG.login.maxAttempts,
      `${AUTH_CONFIG.login.windowMinutes}m`,
    );
    const limitKey = `login_${ip}_${userAgent}`;

    const {
      success: rateLimitSuccess,
      reset,
      remaining,
    } = await rateLimit.limit(limitKey);

    if (!rateLimitSuccess) {
      return {
        success: false,
        message: `Too many attempts. Try again ${formatDistanceToNow(reset, { addSuffix: true })}.`,
      };
    }

    const { success: captchaSuccess } = await verifyCaptchaToken(
      data.captchaToken,
    );
    if (!captchaSuccess) {
      return { success: false, message: GENERIC_ERROR };
    }

    const user = await prisma.user.findUnique({
      where: { email: data.email },
      select: {
        id: true,
        password: true,
        isVerified: true,
        salt: true,
      },
    });

    if (!user) {
      const message =
        remaining < 3
          ? `${GENERIC_ERROR} (${remaining} ${remaining === 1 ? "attempt" : "attempts"} remaining)`
          : GENERIC_ERROR;
      return { success: false, message };
    }

    if (!user.isVerified) {
      const cookieStore = cookies();
      const cookieOptions = {
        maxAge: minutesToSeconds(
          AUTH_CONFIG.emailVerification.cookieMaxAgeMinutes,
        ),
        secure: env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "strict" as const,
      };

      cookieStore.set({
        name: "verification-pending",
        value: "true",
        ...cookieOptions,
      });

      cookieStore.set({
        name: "signup-email",
        value: data.email,
        ...cookieOptions,
      });

      return {
        success: false,
        message: "Please verify your email before logging in.",
        shouldVerifyEmail: true,
      };
    }

    const isValidPassword = await comparePasswords({
      password: data.password,
      salt: user.salt,
      hashedPassword: user.password,
    });

    if (!isValidPassword) {
      const message =
        remaining < 3
          ? `${GENERIC_ERROR} (${remaining} ${remaining === 1 ? "attempt" : "attempts"} remaining)`
          : GENERIC_ERROR;
      return { success: false, message };
    }

    await rateLimit.resetUsedTokens(limitKey);

    return {
      success: true,
      message: "Login successful.",
    };
  } catch (error) {
    return { success: false, message: GENERIC_ERROR };
  }
}
