import { NextResponse } from "next/server";
import { getUserIpAddress } from "@/lib/ip";
import { createRateLimiter } from "@/lib/rate-limiter";

const RATE_LIMIT_MAX_ATTEMPTS = 100;
const RATE_LIMIT_WINDOW_DURATION = "300s";

export const globalRateLimit = createRateLimiter(
  RATE_LIMIT_MAX_ATTEMPTS,
  RATE_LIMIT_WINDOW_DURATION,
);

export async function rateLimitMiddleware() {
  const ip = getUserIpAddress();

  const limitKey = `global_ratelimit_${ip}`;

  const { success } = await globalRateLimit.limit(limitKey);

  return success ? NextResponse.next() : NextResponse.redirect("/blocked");
}

export const rateLimitMiddlewareMatcher = "/";
