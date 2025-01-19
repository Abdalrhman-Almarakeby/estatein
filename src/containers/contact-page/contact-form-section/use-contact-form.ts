import { useFormHandler } from "@/hooks";
import { Inquiry, inquirySchema } from "@/lib/schemas";
import { createInquiry } from "@/server/actions";

export function useContactForm() {
  return useFormHandler<Inquiry>({
    schema: inquirySchema,
    serverAction: createInquiry,
    loadingMessage: "Sending message...",
    successMessage: "Message sent!",
    errorMessage: "An error occurred. Please try again later.",
  });
}
