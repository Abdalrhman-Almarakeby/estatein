"use server";

import { cookies } from "next/headers";
import { createElement } from "react";
import { compare, hash } from "bcryptjs";
import { randomBytes } from "crypto";
import { DashboardVerificationEmail } from "@/components/emails/dashboard-verification-email";
import { WithCaptcha } from "@/types";
import { getBaseUrl } from "@/lib/utils";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { Signup, signupZodSchema } from "@/lib/schemas";
import { verifyCaptchaToken } from "@/lib/services";
import { sendEmail } from "@/actions";

const FIVE_MINUTES = 5 * 60;

export async function signup(
  data: WithCaptcha<Signup>,
  callbackUrl?: string | undefined,
) {
  const { message: captchaMessage, success: captchaIsSuccess } =
    await verifyCaptchaToken(data.captchaToken);

  if (!captchaIsSuccess) {
    return { message: captchaMessage, success: false };
  }

  const { success: isDataValid } = signupZodSchema.safeParse(data);

  if (!isDataValid) {
    return {
      message: "Credentials are not valid. Please try again.",
      success: false,
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
      const currentTime = new Date();

      const isTokenExpired =
        existingUser.emailVerificationExpires &&
        currentTime > existingUser.emailVerificationExpires;

      if (isTokenExpired) {
        const newToken = randomBytes(32).toString("hex");
        const newExpiryDate = new Date();
        newExpiryDate.setHours(newExpiryDate.getHours() + 1);

        await prisma.user.update({
          where: { email: data.email },
          data: {
            emailVerificationToken: newToken,
            emailVerificationExpires: newExpiryDate,
          },
        });

        const verificationUrl = `${getBaseUrl()}/dashboard/auth/verify-email?token=${newToken}${callbackUrl ? `&callbackUrl=${callbackUrl}` : ""}`;

        const template = createElement(DashboardVerificationEmail, {
          username: existingUser.name,
          verificationUrl,
        });

        await sendEmail({
          to: data.email,
          subject: "Verify your email (New Token)",
          template,
        });

        return {
          success: true,
          message:
            "Your verification token expired. A new verification email has been sent. Please check your email.",
        };
      }

      if (existingUser.emailVerificationToken) {
        const passwordMatches = await compare(
          data.password,
          existingUser.password,
        );

        if (!passwordMatches) {
          const newPassword = await hash(data.password, 10);

          await prisma.user.update({
            where: { email: data.email },
            data: { password: newPassword },
          });
        }

        const verificationUrl = `${getBaseUrl()}/dashboard/auth/verify-email?token=${existingUser.emailVerificationToken}${callbackUrl ? `&callbackUrl=${callbackUrl}` : ""}`;

        const template = createElement(DashboardVerificationEmail, {
          username: existingUser.name,
          verificationUrl,
        });

        await sendEmail({
          to: data.email,
          subject: "Verify your email",
          template,
        });

        return {
          success: true,
          message:
            "A new verification email has been sent. Please check your email.",
        };
      }

      return {
        success: false,
        message:
          "User with this email already exists. Please check your email for verification link or try logging in.",
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
        "Signup successful! Please check your email to verify your account.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong during signup, please try again later.",
    };
  }
}
