import { Duration, Ratelimit, RatelimitConfig } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export function createRateLimiter(
  limit: number,
  window: Duration,
  config?: Partial<Omit<RatelimitConfig, "redis" | "limiter">>,
) {
  return new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(limit, window),
    enableProtection: true,
    ...config,
  });
}
