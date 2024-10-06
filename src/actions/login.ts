"use server";

import { compare } from "bcryptjs";
import { WithCaptcha } from "@/types";
import { prisma } from "@/lib/prisma";
import { Login, loginZodSchema } from "@/lib/schemas";
import { verifyCaptchaToken } from "@/lib/services";

export async function login(data: WithCaptcha<Login>) {
  const { success: captchaIsSuccess, message: captchaMessage } =
    await verifyCaptchaToken(data.captchaToken);

  if (!captchaIsSuccess) {
    return { success: false, message: captchaMessage };
  }

  const { success: isDataValid } = loginZodSchema.safeParse(data);

  if (!isDataValid) {
    return {
      success: false,
      message: "Invalid credentials, Please try again.",
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
        message: "Invalid email or password, Please try again.",
      };
    }

    if (!user.isVerified) {
      return {
        success: false,
        message:
          "Your account is not verified. Please check your email for the verification link.",
      };
    }

    const isPasswordValid = await compare(data.password, user.password);

    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid email or password, Please try again.",
      };
    }

    return {
      success: true,
      message: "Login successful.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong, Please try again later.",
    };
  }
}
