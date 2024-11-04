import { z } from "zod";
import { INQUIRY_TYPES, REFERRAL_SOURCE } from "@/constant";
import {
  agreeOnTermsSchema,
  emailSchema,
  messageSchema,
  nameSchema,
  phoneSchema,
} from "./common";

const inquiryTypeSchema = z.enum(INQUIRY_TYPES, {
  message: "Inquiry type is required",
  required_error: "Inquiry type is required",
  invalid_type_error: "Invalid inquiry type",
});

const referralSourceSchema = z.enum(REFERRAL_SOURCE, {
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
