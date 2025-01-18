"use server";

import { cookies } from "next/headers";
import { timingSafeEqual } from "crypto";
import { formatDistanceToNow } from "date-fns";
import { WithCaptcha } from "@/types";
import { getUserIpAddress } from "@/lib/ip";
import { prisma } from "@/lib/prisma";
import { createRateLimiter } from "@/lib/rate-limiter";
import { Otp, otpSchema } from "@/lib/schemas";
import { getUserAgent } from "@/lib/user-agent";
import { AUTH_CONFIG } from "@/config/auth";
import "@/constant";
import { verifyCaptchaToken } from "@/server/services";

const GENERIC_ERROR = "Invalid verification attempt. Please try again.";
const EXPIRED_CODE_ERROR =
  "Verification code has expired. Please request a new one.";

export async function verifyEmail(data: WithCaptcha<Otp>) {
  try {
    const parseResult = otpSchema.safeParse(data);

    if (!parseResult.success) {
      return { success: false, message: GENERIC_ERROR };
    }

    const ip = getUserIpAddress();
    const { ua: userAgent } = getUserAgent();

    const rateLimit = createRateLimiter(
      AUTH_CONFIG.emailVerification.maxAttempts,
      `${AUTH_CONFIG.emailVerification.windowMinutes}m`,
    );

    const limitKey = `email_verification_${ip}_${userAgent}`;
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

    const cookieStore = cookies();
    const signupEmail = cookieStore.get("signup-email")?.value;
    if (!signupEmail) {
      return { success: false, message: GENERIC_ERROR };
    }

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findFirst({
        where: {
          email: signupEmail,
          isVerified: false,
        },
        select: {
          id: true,
          emailVerificationCode: true,
          emailVerificationCodeExpiresAt: true,
        },
      });

      if (!user?.emailVerificationCode) {
        return { success: false };
      }

      const isCodeExpired =
        !user.emailVerificationCodeExpiresAt ||
        user.emailVerificationCodeExpiresAt < new Date();

      if (isCodeExpired) {
        return {
          success: false,
          message: EXPIRED_CODE_ERROR,
        };
      }

      const otpBuffer = new Uint8Array(Buffer.from(data.otp));
      const storedOtpBuffer = new Uint8Array(
        Buffer.from(user.emailVerificationCode),
      );
      const isValidOtp =
        otpBuffer.length === storedOtpBuffer.length &&
        timingSafeEqual(otpBuffer, storedOtpBuffer);

      if (!isValidOtp) {
        const attemptsLeft = remaining - 1;
        const message =
          attemptsLeft < 3
            ? `${GENERIC_ERROR} (${attemptsLeft} ${attemptsLeft === 1 ? "attempt" : "attempts"} remaining)`
            : GENERIC_ERROR;
        return { success: false, message };
      }

      await tx.user.update({
        where: { id: user.id },
        data: {
          isVerified: true,
          emailVerificationCode: null,
          emailVerificationCodeExpiresAt: null,
        },
      });

      return { success: true };
    });

    if (result.success) {
      cookieStore.delete("signup-email");
      cookieStore.delete("verification-pending");

      return {
        success: true,
        message: "Email verified successfully.",
      };
    }
    return {
      success: false,
      message: result.message || GENERIC_ERROR,
    };
  } catch (error) {
    return { success: false, message: GENERIC_ERROR };
  }
}
