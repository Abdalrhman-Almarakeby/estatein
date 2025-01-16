"use server";

import { cookies } from "next/headers";
import { createElement } from "react";
import { Role } from "@prisma/client";
import { hash } from "bcryptjs";
import {
  addMinutes,
  formatDuration,
  intervalToDuration,
  minutesToSeconds,
} from "date-fns";
import { DashboardVerificationEmail } from "@/components/emails/dashboard-verification-email";
import { WithCaptcha } from "@/types";
import { env } from "@/lib/env";
import { getUserIpAddress } from "@/lib/ip";
import { generateNumericOTP } from "@/lib/otp";
import { prisma } from "@/lib/prisma";
import { createRateLimiter } from "@/lib/rate-limiter";
import { Signup, signupSchema } from "@/lib/schemas";
import { getUserAgent } from "@/lib/user-agent";
import {
  EMAIL_VERIFICATION_CODE_EXPIRY_MINUTES,
  EMAIL_VERIFICATION_COOKIE_MAX_AGE_MINUTES,
  PASSWORD_HASH_SALT_ROUNDS,
  SIGNUP_MAX_ATTEMPTS,
  SIGNUP_WINDOW_MINUTES,
} from "@/constant";
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
      SIGNUP_MAX_ATTEMPTS,
      `${SIGNUP_WINDOW_MINUTES}m`,
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
        OR: [{ email: data.email }, { name: data.username }],
      },
      select: {
        email: true,
        name: true,
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
      EMAIL_VERIFICATION_CODE_EXPIRY_MINUTES,
    );

    const isAdmin = isAdminEmail && !existingAdmin;
    const role = isAdmin ? Role.ADMIN : Role.MODERATOR;

    await prisma.$transaction(async (tx) => {
      const hashedPassword = await hash(
        data.password,
        PASSWORD_HASH_SALT_ROUNDS,
      );

      await tx.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          name: data.username,
          emailVerificationCode: verificationCode,
          emailVerificationCodeExpiresAt,
          role,
        },
      });

      const verificationEmailTemplate = createElement(
        DashboardVerificationEmail,
        {
          username: data.username,
          verificationCode,
        },
      );

      await sendEmail({
        to: data.email,
        subject: "Verify your email",
        template: verificationEmailTemplate,
      });
    });

    const cookieStore = cookies();
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
