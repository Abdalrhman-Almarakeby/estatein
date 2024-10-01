import { z } from "zod";

export const captchaZodSchema = z.object({
  captchaToken: z
    .string({
      message: "Please complete the CAPTCHA",
    })
    .min(1, "Please complete the CAPTCHA"),
});

export type Captcha = z.infer<typeof captchaZodSchema>;
