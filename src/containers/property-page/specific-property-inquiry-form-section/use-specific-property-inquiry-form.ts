import { useFormHandler } from "@/hooks";
import {
  SpecificPropertyInquiry,
  specificPropertyInquirySchema,
} from "@/lib/schemas";
import { createSpecificPropertyInquiry } from "@/server/actions";

export function useSpecificPropertyInquiryForm() {
  return useFormHandler<SpecificPropertyInquiry>({
    schema: specificPropertyInquirySchema,
    serverAction: createSpecificPropertyInquiry,
    action: "createSpecificPropertyInquiry",
    loadingMessage: "Sending inquiry...",
    successMessage: "Inquiry sent successfully!",
    errorMessage: "An error occurred. Please try again later.",
  });
}
