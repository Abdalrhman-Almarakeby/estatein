import { useFormHandler } from "@/hooks";
import { Inquiry, inquirySchema } from "@/lib/schemas";
import { createInquiry } from "@/actions";

export function useContactForm() {
  return useFormHandler<Inquiry>({
    schema: inquirySchema,
    serverAction: createInquiry,
  });
}
