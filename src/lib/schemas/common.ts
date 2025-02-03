import { Locations, PropertyType } from "@prisma/client";
import { z } from "zod";
import {
  PRICING_RANGE_OPTIONS,
  PROPERTY_SIZE_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
} from "@/constant";

export const emailSchema = z
  .string({
    required_error: "Email is required",
    invalid_type_error: "Invalid email format",
  })
  .trim()
  .nonempty("Email is required")
  .email("Please enter a valid email address");

export const passwordSchema = z
  .string({
    required_error: "Password is required",
    invalid_type_error: "Invalid password",
  })
  .trim()
  .min(12, "Password must be at least 12 characters long")
  .max(64, "Password must not exceed 64 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character (e.g., !, @, #, $, %, ^, &, *)",
  );

export const nameSchema = (fieldName: string) =>
  z
    .string({
      required_error: `${fieldName} is required`,
      invalid_type_error: `Invalid ${fieldName.toLowerCase()}`,
    })
    .trim()
    .nonempty(`${fieldName} is required`)
    .max(50, `${fieldName} must be at most 50 characters long`);

export const phoneSchema = z
  .string({
    required_error: "Phone number is required",
    invalid_type_error: "Invalid phone number",
  })
  .trim()
  .nonempty("Phone number is required")
  .regex(
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    "Please enter a valid phone number",
  );

export const messageSchema = z
  .string({
    required_error: "Message is required",
    invalid_type_error: "Invalid message",
  })
  .trim()
  .nonempty("Message is required")
  .max(5000, "Message must be at most 5000 characters long");

export const agreeOnTermsSchema = z.literal(true, {
  errorMap: () => ({
    message: "You must agree to the terms and conditions",
  }),
});

export const locationSchema = z.nativeEnum(Locations, {
  message: "Invalid location",
  invalid_type_error: "Invalid location",
});

export const propertyTypeSchema = z.enum(PROPERTY_TYPE_OPTIONS, {
  message: "Invalid property type",
  invalid_type_error: "Invalid property type",
});

export const pricingRangeSchema = z.enum(PRICING_RANGE_OPTIONS, {
  message: "Invalid pricing range",
  invalid_type_error: "Invalid pricing range",
});

export const propertySizeSchema = z.enum(PROPERTY_SIZE_OPTIONS, {
  message: "Invalid property size",
  invalid_type_error: "Invalid property size",
});

export const propertiesTypesSchema = z.nativeEnum(PropertyType, {
  message: "Property type is required",
  required_error: "Property type is required",
  invalid_type_error: "Invalid property type",
});
