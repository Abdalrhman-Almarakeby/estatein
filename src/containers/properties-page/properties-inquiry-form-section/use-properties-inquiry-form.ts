import { useFormHandler } from "@/hooks";
import { PropertyInquiry, propertyInquirySchema } from "@/lib/schemas";
import { createPropertyInquiry } from "@/actions";

export function usePropertyInquiryForm() {
  return useFormHandler<PropertyInquiry>({
    schema: propertyInquirySchema,
    serverAction: createPropertyInquiry,
  });
}
