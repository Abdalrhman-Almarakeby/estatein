import { NextResponse } from "next/server";
import { MiddlewareFunctionProps } from "@rescale/nemo";
import { getToken } from "next-auth/jwt";

export async function unauthenticatedMiddleware({
  request,
}: MiddlewareFunctionProps) {
  const token = await getToken({ req: request });

  if (token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const unauthenticatedMiddlewareMatcher = "/dashboard/auth";
