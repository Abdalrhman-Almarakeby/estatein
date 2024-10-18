import { NextResponse } from "next/server";
import { MiddlewareFunctionProps } from "@rescale/nemo";
import { getToken } from "next-auth/jwt";

export async function authMiddleware({ request }: MiddlewareFunctionProps) {
  const token = await getToken({ req: request });
  const isAuth = !!token;

  if (!isAuth) {
    const url = new URL("/dashboard/auth/login", request.url);

    url.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const authMiddlewareMatcher = "/dashboard/:path";
