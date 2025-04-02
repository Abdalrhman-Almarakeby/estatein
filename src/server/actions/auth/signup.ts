"use server";

import { cookies } from "next/headers";
import { createElement } from "react";
import { Role } from "@prisma/client";
import {
  addMinutes,
  formatDuration,
  intervalToDuration,
  minutesToSeconds,
} from "date-fns";
import { EmailVerification } from "@/components/emails";
import { WithCaptcha } from "@/types";
import { env } from "@/lib/env";
import { getUserIpAddress } from "@/lib/ip";
import { generateNumericOTP } from "@/lib/otp";
import { generateSalt, hashPassword } from "@/lib/password-hasher";
import { prisma } from "@/lib/prisma";
import { createRateLimiter } from "@/lib/rate-limiter";
import { Signup, signupSchema } from "@/lib/schemas";
import { getUserAgent } from "@/lib/user-agent";
import { AUTH_CONFIG } from "@/config/auth";
import { sendEmail, verifyCaptchaToken } from "@/server/services";

export async function signup(data: WithCaptcha<Signup>) {
  try {
    const { success: isDataValid } = signupSchema.safeParse(data);

    if (!isDataValid) {
      return {
        success: false,
        message: "Credentials are not valid. Please try again.",
      };
    }

    const ip = getUserIpAddress();
    const { ua: userAgent } = getUserAgent();
    const rateLimit = createRateLimiter(
      AUTH_CONFIG.signup.maxAttempts,
      `${AUTH_CONFIG.signup.windowMinutes}m`,
    );

    const limitKey = `signup_ratelimit_${ip}_${userAgent}`;
    const { success: rateLimitIsSuccess, reset } =
      await rateLimit.limit(limitKey);

    if (!rateLimitIsSuccess) {
      const duration = intervalToDuration({ start: new Date(), end: reset });
      const formattedDuration = formatDuration(duration, {
        format: ["minutes", "seconds"],
        zero: false,
      });
      return {
        success: false,
        message: `Too many signup attempts, please try again in ${formattedDuration}.`,
      };
    }

    const { success: captchaIsSuccess, message: captchaMessage } =
      await verifyCaptchaToken(data.captchaToken);

    if (!captchaIsSuccess) {
      return { success: false, message: captchaMessage };
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
      select: {
        email: true,
        username: true,
      },
    });

    if (existingUser) {
      return {
        success: false,
        message:
          existingUser.email === data.email
            ? "User with this email already exists, please try logging in."
            : "Username is already taken, please choose a different one.",
      };
    }

    const existingAdmin = await prisma.user.findFirst({
      where: { role: Role.ADMIN },
      select: { authorizedEmailAddresses: true },
    });

    const isAdminEmail = data.email === env.ADMIN_EMAIL;
    const isAuthorized = existingAdmin
      ? existingAdmin.authorizedEmailAddresses.includes(data.email)
      : isAdminEmail;

    if (!isAuthorized) {
      return {
        success: false,
        message: "You are not authorized to sign up with this email.",
      };
    }

    const verificationCode = generateNumericOTP();
    const now = new Date();
    const emailVerificationCodeExpiresAt = addMinutes(
      now,
      AUTH_CONFIG.emailVerification.codeExpiryMinutes,
    );

    const isAdmin = isAdminEmail && !existingAdmin;
    const role = isAdmin ? Role.ADMIN : Role.MODERATOR;

    await prisma.$transaction(async (tx) => {
      const salt = generateSalt();
      const hashedPassword = await hashPassword(data.password, salt);

      await tx.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          salt,
          username: data.username,
          emailVerificationCode: verificationCode,
          emailVerificationCodeExpiresAt,
          role,
        },
      });

      const verificationEmailTemplate = createElement(EmailVerification, {
        recipientName: data.username,
        verificationCode,
      });

      await sendEmail({
        to: data.email,
        subject: "Verify your email",
        template: verificationEmailTemplate,
      });
    });

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
      success: true,
      message:
        "Signup successful! Please check your email for the verification code.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong, please try again later.",
    };
  }
}
