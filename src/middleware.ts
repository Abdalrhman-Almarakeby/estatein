import { type NextRequest, NextResponse } from "next/server";
import {
  getUserFromSession,
  updateUserSessionExpiration,
} from "@/lib/auth/session";
import { createRateLimiter } from "@/lib/rate-limiter";
import { getUserIpAddress } from "./lib/ip";
import { getUserAgent } from "./lib/user-agent";

const RATE_LIMIT_MAX_ATTEMPTS = 100;
const RATE_LIMIT_WINDOW_DURATION = "300s";

const globalRateLimit = createRateLimiter(
  RATE_LIMIT_MAX_ATTEMPTS,
  RATE_LIMIT_WINDOW_DURATION,
);

const PROTECTED_ROUTES = {
  DASHBOARD: "/dashboard",
  AUTH: "/dashboard/auth",
  FORGOT_PASSWORD_SENT: "/dashboard/auth/forgot-password/sent",
  VERIFY_EMAIL: "/dashboard/auth/verify-email",
  BLOCKED: "/blocked",
} as const;

function getGlobalRateLimitKey(ip: string, userAgent: string): string {
  return `global_ratelimit_${ip}_${userAgent}`;
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
    return NextResponse.redirect(
      new URL(PROTECTED_ROUTES.BLOCKED, request.url),
    );
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
): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(PROTECTED_ROUTES.AUTH)) {
    return handleUnauthenticatedRoutes(request);
  }
  const user = await getUserFromSession(request.cookies);

  if (!user) {
    const url = new URL(`${PROTECTED_ROUTES.AUTH}/login`, request.url);
    url.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();

  await updateUserSessionExpiration({
    set: (key, value, options) => {
      response.cookies.set({ ...options, name: key, value });
    },
    get: (key) => request.cookies.get(key),
  });

  return response;
}

async function handleUnauthenticatedRoutes(
  request: NextRequest,
): Promise<NextResponse> {
  const user = await getUserFromSession(request.cookies);
  if (user) {
    return NextResponse.redirect(
      new URL(PROTECTED_ROUTES.DASHBOARD, request.url),
    );
  }

  return NextResponse.next();
}

function handleForgotPasswordSent(request: NextRequest): NextResponse {
  const resetPasswordPending = request.cookies.get("reset-password-pending");

  if (!resetPasswordPending?.value) {
    return NextResponse.redirect(
      new URL(`${PROTECTED_ROUTES.AUTH}/forgot-password`, request.url),
    );
  }

  return NextResponse.next();
}

function handleVerifyEmail(request: NextRequest): NextResponse {
  const verificationPending = request.cookies.get("verification-pending");

  if (!verificationPending?.value) {
    return NextResponse.redirect(
      new URL(`${PROTECTED_ROUTES.AUTH}/signup`, request.url),
    );
  }

  return NextResponse.next();
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  if (shouldApplyRateLimit(pathname)) {
    const rateLimitResult = await applyRateLimit(request);
    if (rateLimitResult) return rateLimitResult;
  }

  switch (pathname) {
    case PROTECTED_ROUTES.BLOCKED:
      return handleBlockedPage(request);

    case PROTECTED_ROUTES.FORGOT_PASSWORD_SENT:
      return handleForgotPasswordSent(request);

    case PROTECTED_ROUTES.VERIFY_EMAIL:
      return handleVerifyEmail(request);

    default:
      if (pathname.startsWith(PROTECTED_ROUTES.DASHBOARD)) {
        return handleDashboardAuth(request);
      }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
