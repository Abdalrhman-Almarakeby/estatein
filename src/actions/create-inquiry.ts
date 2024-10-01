"use server";

import { WithCaptcha } from "@/types";
import { omit } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { Inquiry, inquiryZodSchema } from "@/lib/schemas";
import { verifyCaptchaToken } from "@/lib/services";

export async function createInquiry(data: WithCaptcha<Inquiry>) {
  const { message: captchaMessage, success: captchaIsSuccess } =
    await verifyCaptchaToken(data.captchaToken);

  if (!captchaIsSuccess) {
    return { message: captchaMessage, success: false };
  }

  const { success: isDataValid, error } = inquiryZodSchema.safeParse(data);

  if (!isDataValid) {
    return { message: error.message, success: false };
  }

  try {
    const existingInquiry = await prisma.inquiry.findFirst({
      where: {
        OR: [{ email: data.email }, { phone: data.phone }],
      },
    });

    if (existingInquiry?.email === data.email) {
      return {
        message:
          "An inquiry with this email already exists. We will get back to you as soon as possible.",
        success: false,
      };
    }

    if (existingInquiry?.phone === data.phone) {
      return {
        message:
          "An inquiry with this phone number already exists. We will get back to you as soon as possible.",
        success: false,
      };
    }

    await prisma.inquiry.create({
      data: omit(data, "agreeOnTerms", "captchaToken"),
    });

    return { message: "Your inquiry was sent successfully.", success: true };
  } catch (error) {
    return { message: "Failed to create the inquiry", success: false };
  }
}
