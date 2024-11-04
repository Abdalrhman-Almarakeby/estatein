import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    // TODO: Also don't allow commonly used passwords
    // you could check this out:
    // https://www.npmjs.com/package/@zxcvbn-ts/core
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Invalid password",
      })
      .min(12, "Password must be at least 12 characters long")
      .max(64, "Password must not exceed 64 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character (e.g., !, @, #, $, %, ^, &, *)",
      ),
    confirmPassword: z
      .string({
        required_error: "Confirm password is required",
        invalid_type_error: "Invalid confirm password",
      })
      .min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPassword = z.infer<typeof resetPasswordSchema>;
