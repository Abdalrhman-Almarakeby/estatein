"use server";

import { WithCaptcha } from "@/types";
import { omit } from "@/lib/utils";
import { createRateLimiter } from "@/lib/create-rate-limiter";
import { prisma } from "@/lib/prisma";
import { Inquiry, inquirySchema } from "@/lib/schemas";
import { getUserIpAddress } from "@/lib/utils/get-user-ip-address";
import { verifyCaptchaToken } from "@/services";

const RATE_LIMIT_MAX_ATTEMPTS = 3;
const RATE_LIMIT_WINDOW_DURATION = "1h";

export async function createInquiry(data: WithCaptcha<Inquiry>) {
  const ip = getUserIpAddress();
  const rateLimit = createRateLimiter(
    RATE_LIMIT_MAX_ATTEMPTS,
    RATE_LIMIT_WINDOW_DURATION,
    {
      prefix: "inquiry_ratelimit_",
    },
  );

  const { success: rateLimitIsSuccess } = await rateLimit.limit(ip);

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

  const { success: isDataValid, error } = inquirySchema.safeParse(data);

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
