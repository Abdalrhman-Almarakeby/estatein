import { z } from "zod";
import { emailSchema } from "./common";

export const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Invalid password",
    })
    .trim()
    .nonempty("Password is required")
    .max(64, "Password must not exceed 64 characters"),
});

export type Login = z.infer<typeof loginSchema>;
