import { Banknote, Box, House, MapPin } from "lucide-react";
import { formatWithComma, upperFirst } from "@/lib/utils";
import { LOCATIONS } from "./locations";
import { PRICE_RANGES_BOUNDARIES } from "./pricing-ranges";
import { PROPERTIES_TYPES } from "./properties-types";
import { PROPERTY_SIZES } from "./property-sizes";

export const FILTERING_DATA = [
  {
    name: "location",
    label: "Location",
    Icon: MapPin,
    options: LOCATIONS.map((location) => ({
      label: upperFirst(location),
      value: location,
    })),
  },
  {
    label: "Property Type",
    name: "propertyType",
    Icon: House,
    options: PROPERTIES_TYPES.map((type) => ({
      label: upperFirst(type),
      value: type,
    })),
  },
  {
    label: "Pricing Range",
    name: "pricingRange",
    Icon: Banknote,
    options: PRICE_RANGES_BOUNDARIES.map(({ min, max }, i) => {
      const isLast = i === PRICE_RANGES_BOUNDARIES.length - 1;

      return {
        label: isLast
          ? `${formatWithComma(min)}$+`
          : `${formatWithComma(min)}$ - ${formatWithComma(max)}$`,
        value: isLast ? `${min}` : `${min}-${max}`,
      };
    }),
  },
  {
    label: "Property Size",
    name: "propertySize",
    Icon: Box,
    options: PROPERTY_SIZES.map(({ min, max }, i) => {
      const isLast = i === PRICE_RANGES_BOUNDARIES.length - 1;

      return {
        label: isLast
          ? `${formatWithComma(min)}m²+`
          : `${formatWithComma(min)}m² - ${formatWithComma(max)}m²`,
        value: isLast ? `${min}` : `${min}-${max}`,
      };
    }),
  },
] as const;

export const LOCATION_OPTIONS = getOptionsAsTuple("location") || [""];
export const PROPERTY_TYPE_OPTIONS = getOptionsAsTuple("propertyType") || [""];
export const PRICING_RANGE_OPTIONS = getOptionsAsTuple("pricingRange") || [""];
export const PROPERTY_SIZE_OPTIONS = getOptionsAsTuple("propertySize") || [""];

function getOptionsAsTuple(filterName: string): [string, ...string[]] | null {
  const options = FILTERING_DATA.find(
    ({ name }) => name === filterName,
  )?.options.map(({ value }) => value);
  return options && options.length > 0
    ? [options[0], ...options.slice(1)]
    : null;
}
