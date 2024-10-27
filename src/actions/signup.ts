"use server";

import { cookies } from "next/headers";
import { createElement } from "react";
import { hash } from "bcryptjs";
import { DashboardVerificationEmail } from "@/components/emails/dashboard-verification-email";
import { WithCaptcha } from "@/types";
import { env } from "@/lib/env";
import { getUserIpAddress } from "@/lib/ip";
import { generateNumericOTP } from "@/lib/otp";
import { prisma } from "@/lib/prisma";
import { createRateLimiter } from "@/lib/rate-limiter";
import { Signup, signupSchema } from "@/lib/schemas";
import { getUserAgent } from "@/lib/user-agent";
import { sendEmail, verifyCaptchaToken } from "@/services";

const ONE_HOUR = 60 * 60;

const RATE_LIMIT_MAX_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW_DURATION = "1h";

export async function signup(data: WithCaptcha<Signup>) {
  const ip = getUserIpAddress();
  const { ua: userAgent } = getUserAgent();

  const rateLimit = createRateLimiter(
    RATE_LIMIT_MAX_ATTEMPTS,
    RATE_LIMIT_WINDOW_DURATION,
  );

  const limitKey = `signup_ratelimit_${ip}_${userAgent}`;

  const { success: rateLimitIsSuccess } = await rateLimit.limit(limitKey);

  if (!rateLimitIsSuccess) {
    return {
      success: false,
      message: "Too many signup attempts, please try again later.",
    };
  }

  const { success: captchaIsSuccess, message: captchaMessage } =
    await verifyCaptchaToken(data.captchaToken);

  if (!captchaIsSuccess) {
    return { success: false, message: captchaMessage };
  }

  const { success: isDataValid } = signupSchema.safeParse(data);

  if (!isDataValid) {
    return {
      success: false,
      message: "Credentials are not valid. Please try again.",
    };
  }

  try {
    const admin = await prisma.user.findFirst({
      where: {
        role: "ADMIN",
      },
    });

    if (admin) {
      const isAuthorized = admin.authorizedEmailAddresses.includes(data.email);

      if (!isAuthorized) {
        return {
          success: false,
          message: "You are not authorized to sign up with this email.",
        };
      }
    } else {
      if (data.email !== env.ADMIN_EMAIL) {
        return {
          success: false,
          message: "You are not authorized to sign up with this email.",
        };
      }
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { name: data.username }],
      },
    });

    if (existingUser) {
      return {
        success: false,
        message: "User with this email already exists, please try logging in.",
      };
    }

    const hashedPassword = await hash(data.password, 10);

    const verificationCode = generateNumericOTP();

    const emailVerificationCodeExpiresAt = new Date();
    emailVerificationCodeExpiresAt.setHours(
      emailVerificationCodeExpiresAt.getHours() + 1,
    );

    const isAdmin = data.email === env.ADMIN_EMAIL && !admin;

    await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.username,
        emailVerificationCode: verificationCode,
        emailVerificationCodeExpiresAt,
        role: isAdmin ? "ADMIN" : "MODERATOR",
      },
    });

    const template = createElement(DashboardVerificationEmail, {
      username: data.username,
      verificationCode,
    });

    const cookieStore = cookies();

    cookieStore.set({
      name: "verification-pending",
      value: "true",
      maxAge: ONE_HOUR,
      path: "/dashboard/auth/verify-email",
    });

    cookieStore.set({
      name: "signup-email",
      value: data.email,
      maxAge: ONE_HOUR,
      path: "/dashboard/auth/verify-email",
    });

    await sendEmail({
      to: data.email,
      subject: "Verify your email",
      template,
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
