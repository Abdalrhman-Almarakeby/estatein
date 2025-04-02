"use server";

import { cookies } from "next/headers";
import { createElement } from "react";
import { addMinutes, formatDistanceToNow, minutesToSeconds } from "date-fns";
import { EmailVerification } from "@/components/emails";
import { env } from "@/lib/env";
import { getUserIpAddress } from "@/lib/ip";
import { generateNumericOTP } from "@/lib/otp";
import { prisma } from "@/lib/prisma";
import { createRateLimiter } from "@/lib/rate-limiter";
import { getUserAgent } from "@/lib/user-agent";
import { AUTH_CONFIG } from "@/config/auth";
import "@/constant";
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
      AUTH_CONFIG.emailVerification.resend.maxAttempts,
      `${AUTH_CONFIG.emailVerification.resend.windowMinutes}m`,
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
        username: true,
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
      AUTH_CONFIG.emailVerification.codeExpiryMinutes,
    );

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: user.id },
        data: {
          emailVerificationCode: verificationCode,
          emailVerificationCodeExpiresAt,
        },
      });

      const verificationEmailTemplate = createElement(EmailVerification, {
        recipientName: user.username,
        verificationCode,
      });

      await sendEmail({
        to: email,
        subject: "Verify your email",
        template: verificationEmailTemplate,
      });
    });

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
