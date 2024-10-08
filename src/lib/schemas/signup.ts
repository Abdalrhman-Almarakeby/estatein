import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(10, { message: "Username cannot be more than 10 characters long." })
    .regex(/^[^0-9]/, { message: "Username must not start with a number." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores.",
    }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Invalid Email",
    })
    .min(1, "Email is required")
    .email("Invalid Email"),
  // TODO: Also don't allow commonly used passwords
  // you could check this out:
  // https://www.npmjs.com/package/@zxcvbn-ts/core
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Invalid Password",
    })
    .min(1, "Password is required")
    .min(12, { message: "Password must be at least 12 characters long" })
    .max(64, { message: "Password must not exceed 64 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message:
        "Password must contain at least one special character (e.g. !, @, $, etc..)",
    }),
  confirmPassword: z
    .string({
      required_error: "Confirm Password is required",
      invalid_type_error: "Invalid Confirm Password",
    })
    .min(1, "Confirm Password is required"),
});

export type Signup = z.infer<typeof signupSchema>;
