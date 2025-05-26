import { z } from "zod";
import { emailSchema } from "./common";

export const userSchema = z.object({
  email: emailSchema,
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Invalid username",
    })
    .nonempty("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(50, "Username cannot be more than 50 characters long")
    .regex(/^[a-zA-Z][a-zA-Z0-9_]*$/, {
      message:
        "Username must start with a letter and can only contain letters, numbers, and underscores",
    }),
});

export type UserData = z.infer<typeof userSchema>;
