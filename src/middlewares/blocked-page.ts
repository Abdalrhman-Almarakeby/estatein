import { NextResponse } from "next/server";
import { MiddlewareFunctionProps } from "@rescale/nemo";
import { getUserIpAddress } from "@/lib/ip";
import { getUserAgent } from "@/lib/user-agent";
import {
  getGlobalRateLimitKey,
  globalRateLimit,
} from "@/middlewares/rate-limit";

export async function blockedPageMiddleware({
  request,
}: MiddlewareFunctionProps) {
  const ip = getUserIpAddress();
  const { ua: userAgent } = getUserAgent();

  const limitKey = getGlobalRateLimitKey(ip, userAgent);

  const { success } = await globalRateLimit.limit(limitKey);

  if (success) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const blockedPageMiddlewareMatcher = "/blocked";
