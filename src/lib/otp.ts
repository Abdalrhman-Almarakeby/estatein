import { randomInt } from "crypto";

export function generateNumericOTP(length: number = 6): string {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  return randomInt(min, max + 1).toString();
}
