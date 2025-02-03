import { z } from "zod";
import {
  agreeOnTermsSchema,
  emailSchema,
  messageSchema,
  nameSchema,
  phoneSchema,
} from "./common";

export const specificPropertyInquirySchema = z.object({
  firstName: nameSchema("First name"),
  lastName: nameSchema("Last name"),
  email: emailSchema,
  phone: phoneSchema,
  propertyId: z
    .string({
      required_error: "Property ID is required",
      invalid_type_error: "Invalid property ID",
    })
    .nonempty("Property ID is required")
    .cuid("Invalid property ID format"),
  message: messageSchema,
  agreeOnTerms: agreeOnTermsSchema,
});

export type SpecificPropertyInquiry = z.infer<
  typeof specificPropertyInquirySchema
>;
