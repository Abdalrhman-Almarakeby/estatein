import { PropertyType } from "@prisma/client";
import { Banknote, Box, House, MapPin } from "lucide-react";
import { normalize, upperFirst } from "@/lib/utils";
import { createRangeOptions } from "@/lib/utils/numbers";
import { LOCATIONS } from "./locations";
import { PRICE_RANGES_BOUNDARIES } from "./pricing-ranges";
import { PROPERTY_SIZES } from "./property-sizes";

export const FILTERING_DATA = [
  {
    name: "location",
    label: "Location",
    Icon: MapPin,
    options: LOCATIONS.map((location) => ({
      label: upperFirst(normalize(location)),
      value: location,
    })),
  },
  {
    name: "propertyType",
    label: "Property Type",
    Icon: House,
    options: Object.keys(PropertyType).map((type) => ({
      label: upperFirst(normalize(type)),
      value: type,
    })),
  },
  {
    name: "pricingRange",
    label: "Pricing Range",
    Icon: Banknote,
    options: createRangeOptions(PRICE_RANGES_BOUNDARIES, "$"),
  },
  {
    name: "propertySize",
    label: "Property Size",
    Icon: Box,
    options: createRangeOptions(PROPERTY_SIZES, "m²"),
  },
] as const;

export const [
  LOCATION_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  PRICING_RANGE_OPTIONS,
  PROPERTY_SIZE_OPTIONS,
] = [
  FILTERING_DATA[0].options.map((o) => o.value),
  FILTERING_DATA[1].options.map((o) => o.value),
  FILTERING_DATA[2].options.map((o) => o.value),
  FILTERING_DATA[3].options.map((o) => o.value),
  // type casting to make it work as an enum with zod
] as [string, ...string[]][];
