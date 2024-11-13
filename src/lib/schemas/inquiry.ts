import { InquiryType, ReferralSource } from "@prisma/client";
import { z } from "zod";
import {
  agreeOnTermsSchema,
  emailSchema,
  messageSchema,
  nameSchema,
  phoneSchema,
} from "./common";

const inquiryTypeSchema = z.nativeEnum(InquiryType, {
  message: "Inquiry type is required",
  required_error: "Inquiry type is required",
  invalid_type_error: "Invalid inquiry type",
});

inquiryTypeSchema.safeParse("Other");

const referralSourceSchema = z.nativeEnum(ReferralSource, {
  message: "Please select how you heard about us",
  required_error: "Please select how you heard about us",
  invalid_type_error: "Invalid referral source",
});

export const inquirySchema = z.object({
  firstName: nameSchema("First name"),
  lastName: nameSchema("Last name"),
  email: emailSchema,
  phone: phoneSchema,
  inquiryType: inquiryTypeSchema,
  referralSource: referralSourceSchema,
  message: messageSchema,
  agreeOnTerms: agreeOnTermsSchema,
});

export type Inquiry = z.infer<typeof inquirySchema>;
