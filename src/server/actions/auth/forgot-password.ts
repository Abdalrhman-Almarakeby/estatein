"use server";

import { cookies } from "next/headers";
import { createElement } from "react";
import { randomBytes } from "crypto";
import { add, formatDistanceToNow, minutesToSeconds } from "date-fns";
import { PasswordReset } from "@/components/emails";
import { WithCaptcha } from "@/types";
import { getBaseUrl } from "@/lib/utils";
import { env } from "@/lib/env";
import { getUserIpAddress } from "@/lib/ip";
import { prisma } from "@/lib/prisma";
import { createRateLimiter } from "@/lib/rate-limiter";
import { Email, emailSchema } from "@/lib/schemas";
import { getUserAgent } from "@/lib/user-agent";
import {
  FORGOT_PASSWORD_TOKEN_EXPIRY_MINUTES,
  FORGOT_PASSWORD_WINDOW_MINUTES,
  MAX_FORGOT_PASSWORD_ATTEMPTS,
} from "@/constant";
import { sendEmail, verifyCaptchaToken } from "@/server/services";

const GENERIC_MESSAGE =
  "If an account exists with this email, a reset link has been sent.";
const GENERIC_ERROR = "Please try again later.";

export async function forgotPassword(
  data: WithCaptcha<Email>,
  callbackUrl?: string,
) {
  try {
    const parseResult = emailSchema.safeParse(data);
    if (!parseResult.success) {
      return { success: false, message: GENERIC_ERROR };
    }

    const ip = getUserIpAddress();
    const { ua: userAgent } = getUserAgent();

    const rateLimit = createRateLimiter(
      MAX_FORGOT_PASSWORD_ATTEMPTS,
      `${FORGOT_PASSWORD_WINDOW_MINUTES}m`,
    );
    const limitKey = `reset_password_${ip}_${userAgent}`;

    const { success: rateLimitSuccess, reset } =
      await rateLimit.limit(limitKey);
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
      const user = await tx.user.findUnique({
        where: { email: data.email },
        select: {
          id: true,
          email: true,
          name: true,
          passwordResetToken: true,
          passwordResetTokenExpiresAt: true,
        },
      });

      if (!user) return { success: true, message: GENERIC_MESSAGE };

      const resetToken = randomBytes(32).toString("hex");
      const resetTokenExpiresAt = add(new Date(), {
        minutes: FORGOT_PASSWORD_TOKEN_EXPIRY_MINUTES,
      });

      await tx.user.update({
        where: { id: user.id },
        data: {
          passwordResetToken: resetToken,
          passwordResetTokenExpiresAt: resetTokenExpiresAt,
        },
      });

      const params = new URLSearchParams({ token: resetToken });

      if (callbackUrl) params.append("callbackUrl", callbackUrl);

      const template = createElement(PasswordReset, {
        recipientName: user.name,
        resetUrl: `${getBaseUrl()}/dashboard/auth/reset-password?${params.toString()}`,
      });

      await sendEmail({
        subject: "Reset Password",
        to: user.email,
        template,
      });

      return { success: true, message: GENERIC_MESSAGE };
    });

    const cookieStore = cookies();
    cookieStore.set({
      name: "reset-password-pending",
      value: "true",
      maxAge: minutesToSeconds(FORGOT_PASSWORD_TOKEN_EXPIRY_MINUTES),
      secure: env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
    });

    return result;
  } catch (error) {
    return { success: false, message: GENERIC_ERROR };
  }
}
