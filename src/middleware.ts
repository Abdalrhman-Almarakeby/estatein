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
  const { pathname } = request.nextUrl;

  // Apply rate limiting for non-static routes
  if (shouldApplyRateLimit(pathname)) {
    const rateLimitResult = await applyRateLimit(request);
    if (rateLimitResult) return rateLimitResult;
  }

  // Handle blocked page
  if (pathname === "/blocked") {
    return handleBlockedPage(request);
  }

  // Handle authentication for dashboard routes
  if (pathname.startsWith("/dashboard")) {
    return handleDashboardAuth(request);
  }

  // Handle forgot password sent page
  if (pathname === "/dashboard/auth/forgot-password/sent") {
    return handleForgotPasswordSent(request);
  }

  // Handle verify email page
  if (pathname === "/dashboard/auth/verify-email") {
    return handleVerifyEmail(request);
  }

  return NextResponse.next();
}

function shouldApplyRateLimit(pathname: string): boolean {
  return /^\/(?!api|blocked|_next\/static|_next\/image|favicon\.ico).*$/.test(
    pathname,
  );
}

async function applyRateLimit(
  request: NextRequest,
): Promise<NextResponse | null> {
  const ip = getUserIpAddress();
  const { ua: userAgent } = getUserAgent();
  const limitKey = getGlobalRateLimitKey(ip, userAgent);

  const { success } = await globalRateLimit.limit(limitKey);

  if (!success) {
    return NextResponse.redirect(new URL("/blocked", request.url));
  }

  return null;
}

async function handleBlockedPage(request: NextRequest): Promise<NextResponse> {
  const ip = getUserIpAddress();
  const { ua: userAgent } = getUserAgent();
  const limitKey = getGlobalRateLimitKey(ip, userAgent);

  const { success } = await globalRateLimit.limit(limitKey);

  if (success) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

async function handleDashboardAuth(
  request: NextRequest,
): Promise<NextResponse | undefined> {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard/auth")) {
    return handleUnauthenticatedRoutes(request);
  }

  const token = await getToken({ req: request });
  if (!token) {
    const url = new URL("/dashboard/auth/login", request.url);
    url.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(url);
  }
}

async function handleUnauthenticatedRoutes(
  request: NextRequest,
): Promise<NextResponse | undefined> {
  const token = await getToken({ req: request });
  if (token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

function handleForgotPasswordSent(
  request: NextRequest,
): NextResponse | undefined {
  const cookieStore = cookies();
  const isResetPasswordPending = cookieStore.get("reset-password-pending");

  if (!isResetPasswordPending) {
    return NextResponse.redirect(
      new URL("/dashboard/auth/forgot-password", request.url),
    );
  }
}

function handleVerifyEmail(request: NextRequest): NextResponse | undefined {
  const cookieStore = cookies();
  const verificationPending = cookieStore.get("verification-pending");

  if (!verificationPending) {
    return NextResponse.redirect(
      new URL("/dashboard/auth/signup", request.url),
    );
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
