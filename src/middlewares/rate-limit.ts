import { NextResponse } from "next/server";
import { createRateLimiter } from "@/lib/create-rate-limiter";
import { getUserIpAddress } from "@/lib/utils/get-user-ip-address";

const RATE_LIMIT_MAX_ATTEMPTS = 100;
const RATE_LIMIT_WINDOW_DURATION = "300s";

export const globalRateLimit = createRateLimiter(
  RATE_LIMIT_MAX_ATTEMPTS,
  RATE_LIMIT_WINDOW_DURATION,
  {
    prefix: "global_ratelimit_",
  },
);

export async function rateLimitMiddleware() {
  const ip = getUserIpAddress();

  const { success } = await globalRateLimit.limit(ip);

  return success ? NextResponse.next() : NextResponse.redirect("/blocked");
}

export const rateLimitMiddlewareMatcher = "/";
