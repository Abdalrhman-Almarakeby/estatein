"use server";

import { WithCaptcha } from "@/types";
import { getUserIpAddress } from "@/lib/ip";
import { prisma } from "@/lib/prisma";
import { createRateLimiter } from "@/lib/rate-limiter";
import { Inquiry, inquirySchema } from "@/lib/schemas";
import { getUserAgent } from "@/lib/user-agent";
import { verifyCaptchaToken } from "@/server/services";

const RATE_LIMIT_MAX_ATTEMPTS = 3;
const RATE_LIMIT_WINDOW_DURATION = "1h";

export async function createInquiry(data: WithCaptcha<Inquiry>) {
  const ip = getUserIpAddress();
  const { ua: userAgent } = getUserAgent();

  const rateLimit = createRateLimiter(
    RATE_LIMIT_MAX_ATTEMPTS,
    RATE_LIMIT_WINDOW_DURATION,
  );

  const limitKey = `inquiry_ratelimit_${ip}_${userAgent}`;

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

  const { success: isDataValid, error } = inquirySchema.safeParse(data);

  if (!isDataValid) {
    return { message: error.message, success: false };
  }

  try {
    const inquiryExistsByEmail = await prisma.inquiry.findFirst({
      where: {
        email: data.email,
      },
      select: {
        email: true,
      },
    });

    if (inquiryExistsByEmail) {
      return {
        message:
          "An inquiry with this email already exists. We will get back to you as soon as possible.",
        success: false,
      };
    }

    const inquiryExistsByPhone = await prisma.inquiry.findFirst({
      where: {
        email: data.phone,
      },
      select: {
        email: true,
      },
    });

    if (inquiryExistsByPhone) {
      return {
        message:
          "An inquiry with this phone number already exists. We will get back to you as soon as possible.",
        success: false,
      };
    }

    await prisma.inquiry.create({
      data,
    });

    return { message: "Your inquiry was sent successfully.", success: true };
  } catch (error) {
    return { message: "Failed to create the inquiry", success: false };
  }
}
