import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Invalid Email",
    })
    .min(1, "Email is required")
    .email("Invalid Email"),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Invalid Password",
    })
    .min(1, "Password is required"),
});

export type Login = z.infer<typeof loginSchema>;
