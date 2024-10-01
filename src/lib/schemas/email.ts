import { z } from "zod";

export const emailZodSchema = z.object({
  email: z
    .string()
    .min(1, "PLease enter you email")
    .email("PLease enter a valid email"),
});

export type Email = z.infer<typeof emailZodSchema>;
