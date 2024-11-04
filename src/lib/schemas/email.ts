import { z } from "zod";

export const emailSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Invalid email format",
    })
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export type Email = z.infer<typeof emailSchema>;
