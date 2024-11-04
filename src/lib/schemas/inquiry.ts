import { z } from "zod";
import { INQUIRY_TYPES } from "@/constant";
import { REFERRAL_SOURCE } from "@/constant/referral-source";

export const inquirySchema = z.object({
  firstName: z
    .string({
      required_error: "First name is required",
      invalid_type_error: "Invalid first name",
    })
    .min(1, "First name is required")
    .max(50, "First name must be at most 50 characters long"),
  lastName: z
    .string({
      required_error: "Last name is required",
      invalid_type_error: "Invalid last name",
    })
    .min(1, "Last name is required")
    .max(50, "Last name must be at most 50 characters long"),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Invalid email format",
    })
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string({
      required_error: "Phone number is required",
      invalid_type_error: "Invalid phone number",
    })
    .min(1, "Phone number is required")
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {
      message: "Please enter a valid phone number",
    }),
  inquiryType: z.enum(INQUIRY_TYPES, {
    message: "Inquiry type is required",
    required_error: "Inquiry type is required",
    invalid_type_error: "Invalid inquiry type",
  }),
  referralSource: z.enum(REFERRAL_SOURCE, {
    message: "Please select how you heard about us",
    required_error: "Please select how you heard about us",
    invalid_type_error: "Invalid referral source",
  }),
  message: z
    .string({
      required_error: "Message is required",
      invalid_type_error: "Invalid message",
    })
    .min(1, "Message is required")
    .max(5000, "Message must be at most 5000 characters long"),
  agreeOnTerms: z.literal(true, {
    errorMap: () => ({
      message: "You must agree to the terms and conditions",
    }),
  }),
});

export type Inquiry = z.infer<typeof inquirySchema>;
