import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Invalid email format",
    })
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Invalid password",
    })
    .min(1, "Password is required")
    .max(64, "Password must not exceed 64 characters"),
});

export type Login = z.infer<typeof loginSchema>;
