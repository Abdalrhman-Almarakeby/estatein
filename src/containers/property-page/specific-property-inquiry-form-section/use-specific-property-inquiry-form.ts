import { useFormHandler } from "@/hooks";
import {
  SpecificPropertyInquiry,
  specificPropertyInquiryZodSchema,
} from "@/lib/schemas";
import { createSpecificPropertyInquiry } from "@/actions";

export function useSpecificPropertyInquiryForm() {
  return useFormHandler<SpecificPropertyInquiry>({
    schema: specificPropertyInquiryZodSchema,
    serverAction: createSpecificPropertyInquiry,
  });
}
