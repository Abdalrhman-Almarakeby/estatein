import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { MiddlewareFunctionProps } from "@rescale/nemo";

export async function verifyEmailPageMiddleware({
  request,
}: MiddlewareFunctionProps) {
  const cookieStore = cookies();

  const verificationPending = cookieStore.get("verification-pending");

  if (!verificationPending) {
    return NextResponse.redirect(
      new URL("/dashboard/auth/signup", request.url),
    );
  }

  return NextResponse.next();
}

export const verifyEmailPageMiddlewareMatcher = "/dashboard/auth/verify-email";
