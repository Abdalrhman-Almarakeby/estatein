import { useFormHandler } from "@/hooks";
import { Email, emailSchema } from "@/lib/schemas";
import { subscribeToNewsletter } from "@/actions";

export function useNewsletter() {
  return useFormHandler<Email>({
    schema: emailSchema,
    serverAction: subscribeToNewsletter,
  });
}
