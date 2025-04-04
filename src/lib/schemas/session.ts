import { Role } from "@prisma/client";
import { z } from "zod";

export const sessionSchema = z.object({
  id: z.string(),
  role: z.nativeEnum(Role),
});

export type UserSession = z.infer<typeof sessionSchema>;
