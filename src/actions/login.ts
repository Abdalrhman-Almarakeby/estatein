"use server";

import { compare } from "bcryptjs";
import { WithCaptcha } from "@/types";
import { prisma } from "@/lib/prisma";
import { Login, loginZodSchema } from "@/lib/schemas";
import { verifyCaptchaToken } from "@/lib/services";

export async function login(data: WithCaptcha<Login>) {
  const { message: captchaMessage, success: captchaIsSuccess } =
    await verifyCaptchaToken(data.captchaToken);

  if (!captchaIsSuccess) {
    return { message: captchaMessage, success: false };
  }

  const { success: isDataValid } = loginZodSchema.safeParse(data);

  if (!isDataValid) {
    return {
      message: "Credentials are not valid, Please try again",
      success: false,
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return {
        success: false,
        message:
          "A user with this email doesn't exist. If you don't have an account, please sign up.",
      };
    }

    if (!user.isVerified) {
      return {
        success: false,
        message: "Please verify your email before logging in.",
      };
    }

    if (!(await compare(data.password, user.password))) {
      return {
        success: false,
        message: "Incorrect password, Please try again",
      };
    }

    return {
      success: true,
      message: "Login successful.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong, Please try again later",
    };
  }
}
