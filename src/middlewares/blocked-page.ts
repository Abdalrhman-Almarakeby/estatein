import { NextResponse } from "next/server";
import { getUserIpAddress } from "@/lib/ip";
import { globalRateLimit } from "@/middlewares/rate-limit";

export async function blockedPageMiddleware() {
  const ip = getUserIpAddress();
  const { success } = await globalRateLimit.limit(ip);

  if (!success) {
    return NextResponse.rewrite("/blocked");
  }

  return NextResponse.next();
}

export const blockedPageMiddlewareMatcher = "/blocked";
