import { useFormHandler } from "@/hooks";
import { Inquiry, inquiryZodSchema } from "@/lib/schemas";
import { createInquiry } from "@/actions";

export function useContactForm() {
  return useFormHandler<Inquiry>({
    schema: inquiryZodSchema,
    serverAction: createInquiry,
  });
}
