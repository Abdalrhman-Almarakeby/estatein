import { z } from "zod";
import {
  LOCATION_OPTIONS,
  PRICING_RANGE_OPTIONS,
  PROPERTY_SIZE_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
} from "@/constant";

export const propertiesFiltersSchema = z.object({
  location: z
    .enum(LOCATION_OPTIONS, {
      message: "Invalid location",
      invalid_type_error: "Invalid location",
    })
    .optional(),
  propertyType: z
    .enum(PROPERTY_TYPE_OPTIONS, {
      message: "Invalid property type",
      invalid_type_error: "Invalid property type",
    })
    .optional(),
  pricingRange: z
    .enum(PRICING_RANGE_OPTIONS, {
      message: "Invalid pricing range",
      invalid_type_error: "Invalid pricing range",
    })
    .optional(),
  propertySize: z
    .enum(PROPERTY_SIZE_OPTIONS, {
      message: "Invalid property size",
      invalid_type_error: "Invalid property size",
    })
    .optional(),
});

export type PropertiesFilters = z.infer<typeof propertiesFiltersSchema>;
