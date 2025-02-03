import { PropertyType } from "@prisma/client";
import { z } from "zod";
import { locationSchema } from "./common";

export const propertyDataSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Invalid title",
    })
    .nonempty("Title is required")
    .max(100, "Title must be at most 100 characters long"),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Invalid description",
    })
    .nonempty("Description is required")
    .max(5000, "Description must be at most 5000 characters long"),
  location: locationSchema,
  propertyType: z.nativeEnum(PropertyType, {
    message: "Invalid property type",
    required_error: "Property type is required",
  }),
  bedrooms: z
    .number({
      required_error: "Number of bedrooms is required",
      invalid_type_error: "Invalid number of bedrooms",
    })
    .int("Number of bedrooms must be a whole number")
    .min(1, "Number of bedrooms must be at least 1")
    .max(10, "Number of bedrooms must be at most 10"),
  bathrooms: z
    .number({
      required_error: "Number of bathrooms is required",
      invalid_type_error: "Invalid number of bathrooms",
    })
    .int("Number of bathrooms must be a whole number")
    .min(1, "Number of bathrooms must be at least 1")
    .max(10, "Number of bathrooms must be at most 10"),
  area: z
    .number({
      required_error: "Area is required",
      invalid_type_error: "Invalid area",
    })
    .int("Area must be a whole number")
    .positive("Area must be a positive number"),
  images: z
    .array(z.string().url("Each image must be a valid URL"), {
      required_error: "Images are required",
    })
    .nonempty("At least one image is required"),
  features: z
    .array(z.string(), {
      required_error: "Features are required",
    })
    .nonempty("At least one feature is required"),
  listingPrice: z
    .number({
      required_error: "Listing price is required",
      invalid_type_error: "Invalid listing price",
    })
    .int("Listing price must be a whole number")
    .positive("Listing price must be a positive number"),
  transferTax: z
    .number({
      required_error: "Transfer tax is required",
      invalid_type_error: "Invalid transfer tax",
    })
    .int("Transfer tax must be a whole number")
    .positive("Transfer tax must be a positive number"),
  legalFees: z
    .number({
      required_error: "Legal fees are required",
      invalid_type_error: "Invalid legal fees",
    })
    .int("Legal fees must be a whole number")
    .positive("Legal fees must be a positive number"),
  homeInspection: z
    .number({
      required_error: "Home inspection cost is required",
      invalid_type_error: "Invalid home inspection cost",
    })
    .int("Home inspection cost must be a whole number")
    .positive("Home inspection cost must be a positive number"),
  insurance: z
    .number({
      required_error: "Insurance is required",
      invalid_type_error: "Invalid insurance",
    })
    .int("Insurance must be a whole number")
    .positive("Insurance must be a positive number"),
  taxes: z
    .number({
      required_error: "Taxes are required",
      invalid_type_error: "Invalid taxes",
    })
    .int("Taxes must be a whole number")
    .positive("Taxes must be a positive number"),
  homeownersAssociationFee: z
    .number({
      required_error: "HOA fee is required",
      invalid_type_error: "Invalid HOA fee",
    })
    .int("HOA fee must be a whole number")
    .positive("HOA fee must be a positive number"),
  additionalFees: z
    .number({
      required_error: "Additional fees are required",
      invalid_type_error: "Invalid additional fees",
    })
    .int("Additional fees must be a whole number")
    .positive("Additional fees must be a positive number"),
  downPayment: z
    .number({
      required_error: "Down payment is required",
      invalid_type_error: "Invalid down payment",
    })
    .int("Down payment must be a whole number")
    .positive("Down payment must be a positive number"),
  mortgage: z
    .number({
      required_error: "Mortgage is required",
      invalid_type_error: "Invalid mortgage",
    })
    .int("Mortgage must be a whole number")
    .positive("Mortgage must be a positive number"),
});

export type PropertyData = z.infer<typeof propertyDataSchema>;
