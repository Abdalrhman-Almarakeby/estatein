"use server";

import { cookies } from "next/headers";
import { createElement } from "react";
import { randomBytes } from "crypto";
import { PasswordResetEmail } from "@/components/emails/password-reset-email";
import { WithCaptcha } from "@/types";
import { getBaseUrl } from "@/lib/utils";
import { getUserIpAddress } from "@/lib/ip";
import { prisma } from "@/lib/prisma";
import { createRateLimiter } from "@/lib/rate-limiter";
import { Email, emailSchema } from "@/lib/schemas";
import { getUserAgent } from "@/lib/user-agent";
import { sendEmail, verifyCaptchaToken } from "@/services";

const ONE_HOUR = 60 * 60;

const MAX_RESET_PASSWORD_ATTEMPTS = 5;
const RESET_PASSWORD_ATTEMPTS_WINDOW = "30m";

export async function forgotPassword(
  data: WithCaptcha<Email>,
  callbackUrl?: string,
) {
  const ip = getUserIpAddress();
  const { ua: userAgent } = getUserAgent();

  const rateLimit = createRateLimiter(
    MAX_RESET_PASSWORD_ATTEMPTS,
    RESET_PASSWORD_ATTEMPTS_WINDOW,
  );

  const limitKey = `login_ratelimit_${ip}_${userAgent}`;

  const {
    success: rateLimitIsSuccess,
    reset,
    remaining,
  } = await rateLimit.limit(limitKey);

  if (!rateLimitIsSuccess) {
    const remainingMinutes = Math.ceil((reset - Date.now()) / (1000 * 60));

    return {
      success: false,
      message: `Too many attempts, please try again in ${remainingMinutes} ${remainingMinutes === 1 ? "minute" : "minutes"}.`,
    };
  }

  const { success: captchaIsSuccess } = await verifyCaptchaToken(
    data.captchaToken,
  );

  if (!captchaIsSuccess) {
    return {
      success: false,
      message: "Invalid credentials, Please try again.",
    };
  }

  const { success: isDataValid } = emailSchema.safeParse(data);

  if (!isDataValid) {
    return {
      success: false,
      message: `Invalid credentials. Please try again. ${remaining < 3 ? `(${remaining} ${remaining === 1 ? "attempt" : "attempts"} remaining)` : ""}`,
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    const cookieStore = cookies();

    cookieStore.set({
      name: "reset-password-pending",
      value: "true",
      maxAge: ONE_HOUR,
    });

    if (!user) {
      return {
        success: true,
        message:
          "If a user with this email exists, a reset link has been sent.",
      };
    }

    let resetToken = user.passwordResetToken;
    let resetTokenExpiresAt = user.passwordResetTokenExpiresAt;

    if (
      !resetToken ||
      !resetTokenExpiresAt ||
      resetTokenExpiresAt <= new Date()
    ) {
      resetToken = randomBytes(32).toString("hex");
      resetTokenExpiresAt = new Date(Date.now() + 3_600_000);
    } else {
      resetTokenExpiresAt = new Date(Date.now() + 3_600_000);
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: resetToken,
        passwordResetTokenExpiresAt: resetTokenExpiresAt,
      },
    });

    const params = new URLSearchParams({ token: resetToken });

    if (callbackUrl) {
      params.append("callbackUrl", callbackUrl);
    }

    const template = createElement(PasswordResetEmail, {
      username: user.name,
      resetLink: `${getBaseUrl()}/dashboard/auth/reset-password?${params.toString()}`,
    });

    await sendEmail({
      subject: "Reset Password",
      to: user.email,
      template,
    });

    return {
      success: true,
      message: "If a user with this email exists, a reset link has been sent.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong, Please try again later.",
    };
  }
}
