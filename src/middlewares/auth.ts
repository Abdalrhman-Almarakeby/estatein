import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export function authMiddleware() {
  // Type casting to satisfy the MiddlewareConfig type from @rescale/nemo
  return withAuth() as NextResponse;
}

export const authMiddlewareMatcher = "/dashboard";
