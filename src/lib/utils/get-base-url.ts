import { env } from "@/lib/env";

export function getBaseUrl() {
  const protocol = env.NEXT_PUBLIC_VERCEL_URL ? "https://" : "http://";
  const baseUrl =
    env.NEXT_PUBLIC_VERCEL_URL ||
    env.NEXT_PUBLIC_BASE_URL ||
    "http://localhost:3000";

  return `${protocol}${baseUrl}`;
}
