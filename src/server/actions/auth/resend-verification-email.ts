"use server";

import { cookies } from "next/headers";
import { createElement } from "react";
import { addMinutes, formatDistanceToNow, minutesToSeconds } from "date-fns";
import { DashboardVerificationEmail } from "@/components/emails/dashboard-verification-email";
import { env } from "@/lib/env";
import { getUserIpAddress } from "@/lib/ip";
import { generateNumericOTP } from "@/lib/otp";
import { prisma } from "@/lib/prisma";
import { createRateLimiter } from "@/lib/rate-limiter";
import { getUserAgent } from "@/lib/user-agent";
import {
  EMAIL_VERIFICATION_CODE_EXPIRY_MINUTES,
  EMAIL_VERIFICATION_COOKIE_MAX_AGE_MINUTES,
  MAX_RESEND_VERIFICATION_EMAIL_ATTEMPTS,
  RESEND_VERIFICATION_EMAIL_WINDOW_MINUTES,
} from "@/constant";
import { sendEmail } from "@/server/services";

export async function resendVerificationEmail() {
  try {
    const cookieStore = cookies();
    const email = cookieStore.get("signup-email")?.value;

    if (!email) {
      return {
        success: false,
        message: "Email not found. Please try signing up again.",
      };
    }

    const ip = getUserIpAddress();
    const { ua: userAgent } = getUserAgent();
    const rateLimit = createRateLimiter(
      MAX_RESEND_VERIFICATION_EMAIL_ATTEMPTS,
      `${RESEND_VERIFICATION_EMAIL_WINDOW_MINUTES}m`,
    );

    const limitKey = `resend_verification_${ip}_${userAgent}`;
    const { success: rateLimitSuccess, reset } =
      await rateLimit.limit(limitKey);

    if (!rateLimitSuccess) {
      return {
        success: false,
        message: `Too many attempts. Try again ${formatDistanceToNow(reset, { addSuffix: true })}.`,
      };
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        isVerified: true,
        emailVerificationCode: true,
        emailVerificationCodeExpiresAt: true,
      },
    });

    if (!user) {
      return { success: false, message: "User not found." };
    }

    if (user.isVerified) {
      return { success: false, message: "Email is already verified." };
    }

    const verificationCode = generateNumericOTP();
    const emailVerificationCodeExpiresAt = addMinutes(
      new Date(),
      EMAIL_VERIFICATION_CODE_EXPIRY_MINUTES,
    );

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: user.id },
        data: {
          emailVerificationCode: verificationCode,
          emailVerificationCodeExpiresAt,
        },
      });

      const verificationEmailTemplate = createElement(
        DashboardVerificationEmail,
        {
          username: user.name,
          verificationCode,
        },
      );

      await sendEmail({
        to: email,
        subject: "Verify your email",
        template: verificationEmailTemplate,
      });
    });

    const cookieOptions = {
      maxAge: minutesToSeconds(EMAIL_VERIFICATION_COOKIE_MAX_AGE_MINUTES),
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
      value: email,
      ...cookieOptions,
    });

    return {
      success: true,
      message: "A new verification code has been sent to your email.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
