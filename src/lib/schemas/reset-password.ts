import { z } from "zod";
import { passwordSchema } from "./common";

export const resetPasswordSchema = z
  .object({
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

export type ResetPassword = z.infer<typeof resetPasswordSchema>;
