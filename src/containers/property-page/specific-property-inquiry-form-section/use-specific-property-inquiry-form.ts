import { useFormHandler } from "@/hooks";
import {
  SpecificPropertyInquiry,
  specificPropertyInquirySchema,
} from "@/lib/schemas";
import { createSpecificPropertyInquiry } from "@/actions";

export function useSpecificPropertyInquiryForm() {
  return useFormHandler<SpecificPropertyInquiry>({
    schema: specificPropertyInquirySchema,
    serverAction: createSpecificPropertyInquiry,
  });
}
