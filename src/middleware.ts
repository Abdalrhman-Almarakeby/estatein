import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { createRateLimiter } from "@/lib/rate-limiter";
import { getUserIpAddress } from "./lib/ip";
import { getUserAgent } from "./lib/user-agent";

const RATE_LIMIT_MAX_ATTEMPTS = 100;
const RATE_LIMIT_WINDOW_DURATION = "300s";

const globalRateLimit = createRateLimiter(
  RATE_LIMIT_MAX_ATTEMPTS,
  RATE_LIMIT_WINDOW_DURATION,
);

function getGlobalRateLimitKey(ip: string, userAgent: string) {
  return `global_ratelimit_${ip}_${userAgent}`;
}

export async function middleware(request: NextRequest) {
  // rate limiting middleware
  if (
    /^\/(?!api|blocked|_next\/static|_next\/image|favicon\.ico).*$/.test(
      request.nextUrl.pathname,
    )
  ) {
    const ip = getUserIpAddress();
    const { ua: userAgent } = getUserAgent();

    const limitKey = getGlobalRateLimitKey(ip, userAgent);

    const { success } = await globalRateLimit.limit(limitKey);

    if (!success) {
      return NextResponse.redirect(new URL("/blocked", request.url));
    }
  }

  // blocked page middleware
  if (request.nextUrl.pathname === "/blocked") {
    const ip = getUserIpAddress();
    const { ua: userAgent } = getUserAgent();

    const limitKey = getGlobalRateLimitKey(ip, userAgent);

    const { success } = await globalRateLimit.limit(limitKey);

    if (success) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Auth middleware
  if (/^\/dashboard(?!\/auth).*$/.test(request.nextUrl.pathname)) {
    const token = await getToken({ req: request });
    const isAuth = !!token;

    if (!isAuth) {
      const url = new URL("/dashboard/auth/login", request.url);

      url.searchParams.set("callbackUrl", request.url);

      return NextResponse.redirect(url);
    }
  }

  // Unauthenticated middleware
  if (/^\/dashboard\/auth.*$/.test(request.nextUrl.pathname)) {
    const token = await getToken({ req: request });

    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // forgot password sent page middleware
  if (request.nextUrl.pathname === "/dashboard/auth/forgot-password/sent") {
    const cookieStore = cookies();

    const isResetPasswordPending = cookieStore.get("reset-password-pending");

    if (!isResetPasswordPending) {
      return NextResponse.redirect(
        new URL("/dashboard/auth/forgot-password", request.url),
      );
    }
  }

  // verify email page middleware
  if (request.nextUrl.pathname === "/dashboard/auth/verify-email") {
    const cookieStore = cookies();

    const verificationPending = cookieStore.get("verification-pending");

    if (!verificationPending) {
      return NextResponse.redirect(
        new URL("/dashboard/auth/signup", request.url),
      );
    }
  }
}
