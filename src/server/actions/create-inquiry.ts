"use server";

import { WithCaptcha } from "@/types";
import { omit } from "@/lib/utils";
import { getUserIpAddress } from "@/lib/ip";
import { createRateLimiter } from "@/lib/rate-limiter";
import { Inquiry, inquirySchema } from "@/lib/schemas";
import { getUserAgent } from "@/lib/user-agent";
import {
  createInquiry as createInquiryDb,
  inquiryExistsByEmail,
  inquiryExistsByPhone,
} from "@/server/db/inquiries";
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
    if (await inquiryExistsByEmail(data.email)) {
      return {
        message:
          "An inquiry with this email already exists. We will get back to you as soon as possible.",
        success: false,
      };
    }

    if (await inquiryExistsByPhone(data.phone)) {
      return {
        message:
          "An inquiry with this phone number already exists. We will get back to you as soon as possible.",
        success: false,
      };
    }

    await createInquiryDb(omit(data, "agreeOnTerms", "captchaToken"));

    return { message: "Your inquiry was sent successfully.", success: true };
  } catch (error) {
    return { message: "Failed to create the inquiry", success: false };
  }
}
