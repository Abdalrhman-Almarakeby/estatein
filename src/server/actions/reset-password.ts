"use server";

import { hash } from "bcryptjs";
import { WithCaptcha } from "@/types";
import { getUserIpAddress } from "@/lib/ip";
import { prisma } from "@/lib/prisma";
import { createRateLimiter } from "@/lib/rate-limiter";
import { ResetPassword, resetPasswordSchema } from "@/lib/schemas";
import { getUserAgent } from "@/lib/user-agent";
import { verifyCaptchaToken } from "@/services";

const MAX_RESET_PASSWORD_ATTEMPTS = 5;
const RESET_PASSWORD_ATTEMPTS_WINDOW = "30m";

export async function resetPassword(
  data: WithCaptcha<ResetPassword>,
  token?: string,
) {
  const ip = getUserIpAddress();
  const { ua: userAgent } = getUserAgent();

  const rateLimit = createRateLimiter(
    MAX_RESET_PASSWORD_ATTEMPTS,
    RESET_PASSWORD_ATTEMPTS_WINDOW,
  );

  const limitKey = `reset_password_ratelimit_${ip}_${userAgent}`;

  const {
    success: rateLimitIsSuccess,
    reset,
    remaining,
  } = await rateLimit.limit(limitKey);

  if (!rateLimitIsSuccess) {
    const remainingMinutes = Math.ceil((reset - Date.now()) / (1000 * 60));

    return {
      success: false,
      message: `Too many attempts, please try again in ${remainingMinutes} ${
        remainingMinutes === 1 ? "minute" : "minutes"
      }.`,
    };
  }

  const { success: captchaIsSuccess } = await verifyCaptchaToken(
    data.captchaToken,
  );

  if (!captchaIsSuccess) {
    return {
      success: false,
      message: "Invalid request, please try again.",
    };
  }

  const { success: isDataValid } = resetPasswordSchema.safeParse(data);

  if (!isDataValid) {
    return {
      success: false,
      message: `Invalid data. Please try again. ${
        remaining < 3
          ? `(${remaining} ${remaining === 1 ? "attempt" : "attempts"} remaining)`
          : ""
      }`,
    };
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetTokenExpiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return {
        success: false,
        isExpired: true,
        message:
          "Invalid or expired reset password token. Please request a new email.",
      };
    }

    const hashedPassword = await hash(data.password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetTokenExpiresAt: null,
      },
    });

    await rateLimit.resetUsedTokens(limitKey);

    return {
      success: true,
      message:
        "Password has been successfully reset. You can now log in with your new password.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
