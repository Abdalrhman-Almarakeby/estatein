"use server";

import { WithCaptcha } from "@/types";
import { omit } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import {
  SpecificPropertyInquiry,
  specificPropertyInquiryZodSchema,
} from "@/lib/schemas";
import { verifyCaptchaToken } from "@/lib/services";

export async function createSpecificPropertyInquiry(
  data: WithCaptcha<SpecificPropertyInquiry>,
) {
  const { message: captchaMessage, success: captchaIsSuccess } =
    await verifyCaptchaToken(data.captchaToken);

  if (!captchaIsSuccess) {
    return { message: captchaMessage, success: false };
  }

  const { success: isDataValid, error } =
    specificPropertyInquiryZodSchema.safeParse(data);

  if (!isDataValid) {
    return { message: error.message, success: false };
  }

  try {
    const property = await prisma.property.findUnique({
      where: {
        id: data.propertyId,
      },
    });

    if (!property) {
      return {
        message: "The property you are trying to inquire about does not exist.",
        success: false,
      };
    }

    const existingInquiry = await prisma.propertyInquiry.findFirst({
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

    await prisma.specificPropertyInquiry.create({
      data: {
        ...omit(data, "agreeOnTerms", "captchaToken"),
      },
    });

    return { message: "Your inquiry was sent successfully.", success: true };
  } catch (error) {
    return {
      message: "Failed to create the property inquiry",
      success: false,
    };
  }
}
