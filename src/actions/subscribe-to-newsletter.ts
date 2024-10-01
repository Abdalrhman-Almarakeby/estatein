"use server";

import { WithCaptcha } from "@/types";
import { prisma } from "@/lib/prisma";
import { Email, emailZodSchema } from "@/lib/schemas";
import { verifyCaptchaToken } from "@/lib/services";

export async function subscribeToNewsletter(data: WithCaptcha<Email>) {
  const { message: captchaMessage, success: captchaIsSuccess } =
    await verifyCaptchaToken(data.captchaToken);

  if (!captchaIsSuccess) {
    return { message: captchaMessage, success: false };
  }

  const { success: isDataValid, error } = emailZodSchema.safeParse(data);

  if (!isDataValid) {
    return { message: error.message, success: false };
  }

  try {
    const existingSubscription = await prisma.newsletter.findUnique({
      where: { email: data.email },
    });

    if (existingSubscription) {
      return { message: "Email is already subscribed.", success: false };
    }

    await prisma.newsletter.create({
      data: { email: data.email },
    });

    return {
      message: "Successfully subscribed to the newsletter.",
      success: true,
    };
  } catch (error) {
    return { message: "Failed to subscribe to the newsletter", success: false };
  }
}
