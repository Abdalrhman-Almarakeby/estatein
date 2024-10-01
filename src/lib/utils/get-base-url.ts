import { env } from "@/lib/env";

function getProtocol() {
  if (env.NEXT_PUBLIC_VERCEL_URL) {
    return "https://";
  }

  return "http://";
}

export function getBaseUrl() {
  if (env.NEXT_PUBLIC_VERCEL_URL) {
    return `${getProtocol()}${env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  return env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
}
