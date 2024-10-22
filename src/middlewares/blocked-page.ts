import { NextResponse } from "next/server";
import { MiddlewareFunctionProps } from "@rescale/nemo";
import { getUserIpAddress } from "@/lib/ip";
import { globalRateLimit } from "@/middlewares/rate-limit";

export async function blockedPageMiddleware({
  request,
}: MiddlewareFunctionProps) {
  const ip = getUserIpAddress();
  const { success } = await globalRateLimit.limit(ip);

  if (success) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const blockedPageMiddlewareMatcher = "/blocked";
