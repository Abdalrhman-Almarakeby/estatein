import { StrictOmit } from "@/types";

export function omit<T extends object, K extends keyof T>(
  object: T,
  keys: readonly K[],
): StrictOmit<T, K> {
  return Object.fromEntries(
    Object.entries(object).filter(([key]) => !keys.includes(key as K)),
  ) as StrictOmit<T, K>;
}
