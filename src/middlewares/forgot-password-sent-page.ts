import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { MiddlewareFunctionProps } from "@rescale/nemo";

export async function forgotPasswordSentPageMiddleware({
  request,
}: MiddlewareFunctionProps) {
  const cookieStore = cookies();

  const isResetPasswordPending = cookieStore.get("reset-password-pending");

  if (!isResetPasswordPending) {
    return NextResponse.redirect(
      new URL("/dashboard/auth/forgot-password", request.url),
    );
  }

  return NextResponse.next();
}

export const forgotPasswordSentPageMiddlewareMatcher =
  "/dashboard/auth/forgot-password/sent";
