import { useFormHandler } from "@/hooks";
import { PropertyInquiry, propertyInquirySchema } from "@/lib/schemas";
import { createPropertyInquiry } from "@/server/actions";

export function usePropertyInquiryForm() {
  return useFormHandler<PropertyInquiry>({
    schema: propertyInquirySchema,
    serverAction: createPropertyInquiry,
    action: "createPropertyInquiry",
    loadingMessage: "Sending inquiry...",
    successMessage: "Inquiry sent successfully!",
    errorMessage: "An error occurred. Please try again later.",
  });
}
