import { z } from "zod";

export const emailSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter you email")
    .email("Please enter a valid email"),
});

export type Email = z.infer<typeof emailSchema>;
