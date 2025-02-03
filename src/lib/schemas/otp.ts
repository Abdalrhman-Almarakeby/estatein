import { z } from "zod";

export const otpSchema = z.object({
  otp: z
    .string({
      required_error: "OTP is required",
      invalid_type_error: "Invalid OTP format",
    })
    .regex(/^\d+$/, "OTP must contain only numbers")
    .length(6, "OTP must be exactly 6 digits"),
});

export type Otp = z.infer<typeof otpSchema>;
