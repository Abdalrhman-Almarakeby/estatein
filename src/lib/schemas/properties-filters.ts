import { z } from "zod";
import {
  LOCATION_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  PRICING_RANGE_OPTIONS,
  PROPERTY_SIZE_OPTIONS,
} from "@/constant";

const propertiesFiltersZodSchema = z.object({
  location: z
    .enum(LOCATION_OPTIONS, {
      invalid_type_error: "Invalid location",
    })
    .optional(),
  propertyType: z
    .enum(PROPERTY_TYPE_OPTIONS, {
      invalid_type_error: "Invalid property type",
    })
    .optional(),
  pricingRange: z
    .enum(PRICING_RANGE_OPTIONS, {
      invalid_type_error: "Invalid pricing range",
    })
    .optional(),
  propertySize: z
    .enum(PROPERTY_SIZE_OPTIONS, {
      invalid_type_error: "Invalid property size",
    })
    .optional(),
});

type PropertiesFilters = z.infer<typeof propertiesFiltersZodSchema>;

export { propertiesFiltersZodSchema, type PropertiesFilters };
