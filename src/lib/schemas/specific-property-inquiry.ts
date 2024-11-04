import { z } from "zod";

export const specificPropertyInquirySchema = z.object({
  firstName: z
    .string({
      required_error: "First name is required",
      invalid_type_error: "Invalid first name",
    })
    .min(1, "First name is required")
    .max(30, "First name must be at most 30 characters long"),
  lastName: z
    .string({
      required_error: "Last name is required",
      invalid_type_error: "Invalid last name",
    })
    .min(1, "Last name is required")
    .max(30, "Last name must be at most 30 characters long"),
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
  propertyId: z
    .string({
      required_error: "Property ID is required",
      invalid_type_error: "Invalid property ID",
    })
    .min(1, "Property ID is required")
    .cuid("Invalid property ID format"),
  message: z
    .string({
      required_error: "Message is required",
      invalid_type_error: "Invalid message",
    })
    .min(1, "Message is required")
    .max(1000, "Message must be at most 1000 characters long"),
  agreeOnTerms: z.literal(true, {
    errorMap: () => ({
      message: "You must agree to the terms and conditions",
    }),
  }),
});

export type SpecificPropertyInquiry = z.infer<
  typeof specificPropertyInquirySchema
>;
