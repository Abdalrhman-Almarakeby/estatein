"use server";

import { cookies } from "next/headers";
import { createElement } from "react";
import { hash } from "bcryptjs";
import { randomBytes } from "crypto";
import { DashboardVerificationEmail } from "@/components/emails/dashboard-verification-email";
import { WithCaptcha } from "@/types";
import { getBaseUrl } from "@/lib/utils";
import { createRateLimiter } from "@/lib/create-rate-limiter";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { Signup, signupSchema } from "@/lib/schemas";
import { sendEmail, verifyCaptchaToken } from "@/lib/services";
import { getUserIpAddress } from "@/lib/utils/get-user-ip-address";

const FIVE_MINUTES = 5 * 60;

const RATE_LIMIT_MAX_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW_DURATION = "1h";

export async function signup(
  data: WithCaptcha<Signup>,
  callbackUrl?: string | undefined,
) {
  const ip = getUserIpAddress();
  const rateLimit = createRateLimiter(
    RATE_LIMIT_MAX_ATTEMPTS,
    RATE_LIMIT_WINDOW_DURATION,
    {
      prefix: "signup_ratelimit_",
    },
  );

  const { success: rateLimitIsSuccess } = await rateLimit.limit(ip);

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

    const emailVerificationToken = randomBytes(32).toString("hex");
    const emailVerificationExpires = new Date();
    emailVerificationExpires.setHours(emailVerificationExpires.getHours() + 1);

    const isAdmin = data.email === env.ADMIN_EMAIL && !admin;

    await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.username,
        emailVerificationToken,
        emailVerificationExpires,
        role: isAdmin ? "ADMIN" : "MODERATOR",
      },
    });

    const verificationUrl = `${getBaseUrl()}/dashboard/auth/verify-email?token=${emailVerificationToken}${
      callbackUrl ? `&callbackUrl=${callbackUrl}` : ""
    }`;

    const template = createElement(DashboardVerificationEmail, {
      username: data.username,
      verificationUrl,
    });

    const cookieStore = cookies();

    cookieStore.set({
      name: "just-signed-up",
      value: "true",
      maxAge: FIVE_MINUTES,
      path: "/dashboard/auth/check-your-email",
    });

    cookieStore.set({
      name: "signing-up-email",
      value: data.email,
      maxAge: FIVE_MINUTES,
      path: "/dashboard/auth/check-your-email",
    });

    await sendEmail({
      to: data.email,
      subject: "Verify your email",
      template,
    });

    return {
      success: true,
      message:
        "Signup successful! Please check your email to verify your email.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong, please try again later.",
    };
  }
}
