import { z } from "zod";
import { emailSchema as emailPropertySchema } from "./common";

export const emailSchema = z.object({
  email: emailPropertySchema,
});

export type Email = z.infer<typeof emailSchema>;
