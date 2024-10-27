import { z } from "zod";

export const otpSchema = z.object({
  otp: z
    .string({
      message: "Please enter the OTP",
    })
    .min(1, "Please enter the OTP"),
});

export type Otp = z.infer<typeof otpSchema>;
