"use server";

import { hash } from "bcryptjs";
import { formatDistanceToNow } from "date-fns";
import { WithCaptcha } from "@/types";
import { getUserIpAddress } from "@/lib/ip";
import { prisma } from "@/lib/prisma";
import { createRateLimiter } from "@/lib/rate-limiter";
import { ResetPassword, resetPasswordSchema } from "@/lib/schemas";
import { getUserAgent } from "@/lib/user-agent";
import {
  MAX_RESET_PASSWORD_ATTEMPTS,
  PASSWORD_HASH_SALT_ROUNDS,
  RESET_PASSWORD_WINDOW_MINUTES,
} from "@/constant";
import { verifyCaptchaToken } from "@/server/services";

const GENERIC_ERROR = "Invalid request. Please try again.";

type ResetPasswordResponse = {
  success: boolean;
  message: string;
  isExpired?: boolean;
};

export async function resetPassword(
  data: WithCaptcha<ResetPassword>,
  token?: string,
): Promise<ResetPasswordResponse> {
  try {
    const parseResult = resetPasswordSchema.safeParse(data);

    if (!parseResult.success) {
      return { success: false, message: GENERIC_ERROR };
    }

    const ip = getUserIpAddress();
    const { ua: userAgent } = getUserAgent();
    const rateLimit = createRateLimiter(
      MAX_RESET_PASSWORD_ATTEMPTS,
      `${RESET_PASSWORD_WINDOW_MINUTES}m`,
    );
    const limitKey = `reset_password_${ip}_${userAgent}`;

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

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findFirst({
        where: {
          passwordResetToken: token,
          passwordResetTokenExpiresAt: { gt: new Date() },
        },
        select: { id: true },
      });

      if (!user) {
        return {
          success: false,
          isExpired: true,
          message: "Reset link expired. Please request a new one.",
        };
      }

      const hashedPassword = await hash(
        data.password,
        PASSWORD_HASH_SALT_ROUNDS,
      );

      await tx.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          passwordResetToken: null,
          passwordResetTokenExpiresAt: null,
        },
      });

      return {
        success: true,
        message: "Password reset successful. You can now log in.",
      };
    });

    if (result.success) {
      await rateLimit.resetUsedTokens(limitKey);
    } else if (remaining < 3) {
      result.message += ` (${remaining} ${remaining === 1 ? "attempt" : "attempts"} remaining)`;
    }

    return result;
  } catch (error) {
    return { success: false, isExpired: false, message: GENERIC_ERROR };
  }
}
