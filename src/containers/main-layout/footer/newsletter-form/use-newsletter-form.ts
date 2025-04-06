import { useFormHandler } from "@/hooks";
import { Email, emailSchema } from "@/lib/schemas";
import { subscribeToNewsletter } from "@/server/actions";

export function useNewsletterForm() {
  return useFormHandler<Email>({
    schema: emailSchema,
    serverAction: subscribeToNewsletter,
    action: "subscribeToNewsletter",
    loadingMessage: "Subscribing to newsletter...",
    successMessage: "Subscribed to newsletter successfully!",
    errorMessage: "An error occurred. Please try again later.",
  });
}
