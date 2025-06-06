"use server";

import { WithCaptcha } from "@/types";
import { getUserIpAddress } from "@/lib/ip";
import { prisma } from "@/lib/prisma";
import { createRateLimiter } from "@/lib/rate-limiter";
import { Email, emailSchema } from "@/lib/schemas";
import { getUserAgent } from "@/lib/user-agent";
import { verifyCaptchaToken } from "@/server/services";

const RATE_LIMIT_MAX_ATTEMPTS = 3;
const RATE_LIMIT_WINDOW_DURATION = "1h";

export async function subscribeToNewsletter(data: WithCaptcha<Email>) {
  const ip = getUserIpAddress();
  const { ua: userAgent } = getUserAgent();

  const rateLimit = createRateLimiter(
    RATE_LIMIT_MAX_ATTEMPTS,
    RATE_LIMIT_WINDOW_DURATION,
  );

  const limitKey = `subscribe_to_newsletter_ratelimit_${ip}_${userAgent}`;

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

  const { success: isDataValid, error } = emailSchema.safeParse(data);

  if (!isDataValid) {
    return { message: error.message, success: false };
  }

  try {
    const newsletterSubscriberExists =
      await prisma.newsletterSubscriber.findFirst({
        where: {
          email: data.email,
        },
        select: {
          email: true,
        },
      });

    if (newsletterSubscriberExists) {
      return { message: "Email is already subscribed.", success: false };
    }

    await prisma.newsletterSubscriber.create({
      data: {
        email: data.email,
      },
    });

    return {
      message: "Successfully subscribed to the newsletter.",
      success: true,
    };
  } catch (error) {
    return { message: "Failed to subscribe to the newsletter", success: false };
  }
}
