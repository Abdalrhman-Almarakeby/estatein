import { z } from "zod";
import { emailSchema as emailValidationSchema } from "./common";

export const emailSchema = z.object({
  email: emailValidationSchema,
});

export type Email = z.infer<typeof emailSchema>;
