import { z } from "zod";

export const signupSchema = z
  .object({
    username: z
      .string({
        required_error: "Username is required",
        invalid_type_error: "Invalid username",
      })
      .min(3, "Username must be at least 3 characters long")
      .max(50, "Username cannot be more than 50 characters long")
      .regex(/^[a-zA-Z][a-zA-Z0-9_]*$/, {
        message:
          "Username must start with a letter and can only contain letters, numbers, and underscores",
      }),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Invalid email format",
      })
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
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

export type Signup = z.infer<typeof signupSchema>;
