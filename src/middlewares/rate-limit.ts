import { NextResponse } from "next/server";
import { MiddlewareFunctionProps } from "@rescale/nemo";
import { getUserIpAddress } from "@/lib/ip";
import { createRateLimiter } from "@/lib/rate-limiter";
import { getUserAgent } from "@/lib/user-agent";

const RATE_LIMIT_MAX_ATTEMPTS = 100;
const RATE_LIMIT_WINDOW_DURATION = "300s";

export const globalRateLimit = createRateLimiter(
  RATE_LIMIT_MAX_ATTEMPTS,
  RATE_LIMIT_WINDOW_DURATION,
);

export async function rateLimitMiddleware({
  request,
}: MiddlewareFunctionProps) {
  const ip = getUserIpAddress();
  const { ua: userAgent } = getUserAgent();

  const limitKey = `global_ratelimit_${ip}_${userAgent}`;

  const { success } = await globalRateLimit.limit(limitKey);

  return success
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/blocked", request.url));
}

export const rateLimitMiddlewareMatcher =
  "/((?!api|_next/static|_next/image|favicon.ico).*)";
