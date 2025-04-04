import { Duration, Ratelimit, RatelimitConfig } from "@upstash/ratelimit";
import { StrictOmit } from "@/types";
import { redisClient } from "@/lib/redis";

export function createRateLimiter(
  limit: number,
  window: Duration,
  config?: Partial<StrictOmit<RatelimitConfig, "redis" | "limiter">>,
) {
  return new Ratelimit({
    redis: redisClient,
    limiter: Ratelimit.slidingWindow(limit, window),
    enableProtection: true,
    ...config,
  });
}
