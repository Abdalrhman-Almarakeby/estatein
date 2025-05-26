import { z } from "zod";
import { passwordSchema } from "./common";

export const changePasswordSchema = z.object({
  currentPassword: passwordSchema,
  newPassword: passwordSchema,
  confirmNewPassword: z
    .string({
      required_error: "Confirm password is required",
      invalid_type_error: "Invalid confirm password",
    })
    .nonempty("Confirm password is required"),
});

export type ChangePassword = z.infer<typeof changePasswordSchema>;
