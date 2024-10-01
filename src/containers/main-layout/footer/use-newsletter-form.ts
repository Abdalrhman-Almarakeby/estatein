import { useFormHandler } from "@/hooks";
import { Email, emailZodSchema } from "@/lib/schemas";
import { subscribeToNewsletter } from "@/actions";

export function useNewsletter() {
  return useFormHandler<Email>({
    schema: emailZodSchema,
    serverAction: subscribeToNewsletter,
  });
}
