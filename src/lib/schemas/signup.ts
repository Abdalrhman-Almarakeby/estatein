import { z } from "zod";
import { emailSchema, passwordSchema } from "./common";

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
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z
      .string({
        required_error: "Confirm password is required",
        invalid_type_error: "Invalid confirm password",
      })
      .nonempty("Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type Signup = z.infer<typeof signupSchema>;
