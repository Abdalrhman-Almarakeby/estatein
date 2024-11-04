import { z } from "zod";
import {
  LOCATION_OPTIONS,
  PRICING_RANGE_OPTIONS,
  PROPERTY_SIZE_OPTIONS,
} from "@/constant";
import { PROPERTIES_TYPES } from "@/constant/filters-data/properties-types";

export const propertyInquirySchema = z.object({
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
  preferredLocation: z.enum(LOCATION_OPTIONS, {
    message: "Preferred location is required",
    required_error: "Preferred location is required",
    invalid_type_error: "Invalid preferred location",
  }),
  propertyType: z.enum(PROPERTIES_TYPES, {
    message: "Property type is required",
    required_error: "Property type is required",
    invalid_type_error: "Invalid property type",
  }),
  bathrooms: z
    .string({
      required_error: "Number of bathrooms is required",
      invalid_type_error: "Invalid number of bathrooms",
    })
    .refine((value) => /^[1-5]$/.test(value), {
      message: "Number of bathrooms must be a whole number between 1 and 5",
    }),
  bedrooms: z
    .string({
      required_error: "Number of bedrooms is required",
      invalid_type_error: "Invalid number of bedrooms",
    })
    .refine((value) => /^(?:[1-9]|10)$/.test(value), {
      message: "Number of bedrooms must be a whole number between 1 and 10",
    }),
  budget: z.enum(PRICING_RANGE_OPTIONS, {
    message: "Budget is required",
    required_error: "Budget is required",
    invalid_type_error: "Invalid budget range",
  }),
  propertySize: z.enum(PROPERTY_SIZE_OPTIONS, {
    message: "Property size is required",
    required_error: "Property size is required",
    invalid_type_error: "Invalid property size",
  }),
  preferredContactMethod: z.enum(["EMAIL", "PHONE"], {
    message: "contact method is required",
    required_error: "Preferred contact method is required",
    invalid_type_error: "Invalid contact method",
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

export type PropertyInquiry = z.infer<typeof propertyInquirySchema>;
