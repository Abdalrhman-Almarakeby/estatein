import { z } from "zod";

export const captchaSchema = z.object({
  captchaToken: z
    .string({
      required_error: "CAPTCHA verification is required",
      invalid_type_error: "Invalid CAPTCHA token",
    })
    .trim()
    .nonempty("CAPTCHA verification is required"),
});

export type Captcha = z.infer<typeof captchaSchema>;
