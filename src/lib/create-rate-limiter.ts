import { Duration, Ratelimit, RatelimitConfig } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

export function createRateLimiter(
  limit: number,
  window: Duration,
  config?: Partial<Omit<RatelimitConfig, "redis" | "limiter">>,
) {
  return new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(limit, window),
    enableProtection: true,
    ...config,
  });
}
