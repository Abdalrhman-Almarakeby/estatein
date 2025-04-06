"use server";

import { WithCaptcha } from "@/types";
import { omit } from "@/lib/utils";
import { createRateLimiter } from "@/lib/auth/rate-limiter";
import { getUserIpAddress } from "@/lib/ip";
import { prisma } from "@/lib/prisma";
import {
  SpecificPropertyInquiry,
  specificPropertyInquirySchema,
} from "@/lib/schemas";
import { getUserAgent } from "@/lib/user-agent";
import { verifyCaptchaToken } from "@/server/services";

const RATE_LIMIT_MAX_ATTEMPTS = 1;
const RATE_LIMIT_WINDOW_DURATION = "1h";

export async function createSpecificPropertyInquiry(
  data: WithCaptcha<SpecificPropertyInquiry>,
) {
  const ip = getUserIpAddress();
  const { ua: userAgent } = getUserAgent();
  const limitKey = `specific_property_inquiry_${data.propertyId}_ratelimit_${ip}_${userAgent}`;

  const rateLimit = createRateLimiter(
    RATE_LIMIT_MAX_ATTEMPTS,
    RATE_LIMIT_WINDOW_DURATION,
  );

  const { success: rateLimitIsSuccess } = await rateLimit.limit(limitKey);

  if (!rateLimitIsSuccess) {
    return {
      success: false,
      message: "Too many inquiries, please try again later.",
    };
  }

  const { message: captchaMessage, success: captchaIsSuccess } =
    await verifyCaptchaToken(data.captchaToken);

  if (!captchaIsSuccess) {
    return { message: captchaMessage, success: false };
  }

  const { success: isDataValid, error } =
    specificPropertyInquirySchema.safeParse(data);

  if (!isDataValid) {
    return { message: error.message, success: false };
  }

  try {
    const propertyExistsById = await prisma.property.findUnique({
      where: { id: data.propertyId },
      select: { id: true },
    });

    if (!propertyExistsById) {
      return {
        message: "The property you are trying to inquire about does not exist.",
        success: false,
      };
    }

    const specificPropertyInquiryExistsByEmail =
      await prisma.specificPropertyInquiry.findFirst({
        where: {
          email: data.email,
        },
        select: {
          email: true,
        },
      });

    if (specificPropertyInquiryExistsByEmail) {
      return {
        message:
          "An inquiry with this email already exists. We will get back to you as soon as possible.",
        success: false,
      };
    }

    const specificPropertyInquiryExistsByPhone =
      await prisma.specificPropertyInquiry.findFirst({
        where: {
          phone: data.phone,
        },
        select: {
          phone: true,
        },
      });

    if (specificPropertyInquiryExistsByPhone) {
      return {
        message:
          "An inquiry with this phone number already exists. We will get back to you as soon as possible.",
        success: false,
      };
    }

    await prisma.specificPropertyInquiry.create({
      data: omit(data, ["captchaToken", "agreeOnTerms"]),
    });

    return { message: "Your inquiry was sent successfully.", success: true };
  } catch (error) {
    return {
      message: "Failed to create the property inquiry",
      success: false,
    };
  }
}
