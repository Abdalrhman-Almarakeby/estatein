import { ContactMethod } from "@prisma/client";
import { z } from "zod";
import {
  agreeOnTermsSchema,
  emailSchema,
  locationSchema,
  messageSchema,
  nameSchema,
  phoneSchema,
  pricingRangeSchema,
  propertiesTypesSchema,
  propertySizeSchema,
} from "./common";

export const propertyInquirySchema = z.object({
  firstName: nameSchema("First name"),
  lastName: nameSchema("Last name"),
  email: emailSchema,
  phone: phoneSchema,
  preferredLocation: locationSchema,
  propertyType: propertiesTypesSchema,
  bathrooms: z
    .string({
      required_error: "Number of bathrooms is required",
      invalid_type_error: "Invalid number of bathrooms",
    })
    .refine((value) => /^[1-5]$/.test(value), {
      message: "Bathrooms must be a whole number between 1 and 5",
    }),
  bedrooms: z
    .string({
      required_error: "Number of bedrooms is required",
      invalid_type_error: "Invalid number of bedrooms",
    })
    .refine((value) => /^(?:[1-9]|10)$/.test(value), {
      message: "Bedrooms must be a whole number between 1 and 10",
    }),
  budget: pricingRangeSchema,
  propertySize: propertySizeSchema,
  preferredContactMethod: z.nativeEnum(ContactMethod, {
    message: "Preferred contact method is required",
    required_error: "Preferred contact method is required",
    invalid_type_error: "Invalid contact method",
  }),
  message: messageSchema,
  agreeOnTerms: agreeOnTermsSchema,
});

export type PropertyInquiry = z.infer<typeof propertyInquirySchema>;
