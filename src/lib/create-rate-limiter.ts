import { Duration, Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

export function createRateLimiter(limit: number, window: Duration) {
  return new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(limit, window),
    enableProtection: true,
  });
}
