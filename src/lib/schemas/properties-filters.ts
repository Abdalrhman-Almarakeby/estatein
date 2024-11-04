import { z } from "zod";
import {
  locationSchema,
  pricingRangeSchema,
  propertySizeSchema,
  propertyTypeSchema,
} from "./common";

export const propertiesFiltersSchema = z.object({
  location: locationSchema.optional(),
  propertyType: propertyTypeSchema.optional(),
  pricingRange: pricingRangeSchema.optional(),
  propertySize: propertySizeSchema.optional(),
});

export type PropertiesFilters = z.infer<typeof propertiesFiltersSchema>;
