import { useFormHandler } from "@/hooks";
import { Inquiry, inquirySchema } from "@/lib/schemas";
import { createInquiry } from "@/server/actions";

export function useContactForm() {
  return useFormHandler<Inquiry>({
    schema: inquirySchema,
    serverAction: createInquiry,
  });
}
