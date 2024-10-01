import { useFormHandler } from "@/hooks";
import { PropertyInquiry, propertyInquiryZodSchema } from "@/lib/schemas";
import { createPropertyInquiry } from "@/actions";

export function usePropertyInquiryForm() {
  return useFormHandler<PropertyInquiry>({
    schema: propertyInquiryZodSchema,
    serverAction: createPropertyInquiry,
  });
}
