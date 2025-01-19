import { useFormHandler } from "@/hooks";
import { Email, emailSchema } from "@/lib/schemas";
import { subscribeToNewsletter } from "@/server/actions";

export function useNewsletter() {
  return useFormHandler<Email>({
    schema: emailSchema,
    serverAction: subscribeToNewsletter,
    loadingMessage: "Subscribing to newsletter...",
    successMessage: "Subscribed to newsletter successfully!",
    errorMessage: "An error occurred. Please try again later.",
  });
}
