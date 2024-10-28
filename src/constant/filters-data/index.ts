import { Banknote, Box, House, MapPin } from "lucide-react";
import { formatWithComma, normalize, upperFirst } from "@/lib/utils";
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
      label: upperFirst(normalize(location)),
      value: location,
    })),
  },
  {
    name: "propertyType",
    label: "Property Type",
    Icon: House,
    options: PROPERTIES_TYPES.map((type) => ({
      label: upperFirst(normalize(type)),
      value: type,
    })),
  },
  {
    name: "pricingRange",
    label: "Pricing Range",
    Icon: Banknote,
    options: PRICE_RANGES_BOUNDARIES.map(({ min, max }) => ({
      label: formatRangeLabel(min, max, "$"),
      value: max ? `${min}-${max}` : `${min}`,
    })),
  },
  {
    name: "propertySize",
    label: "Property Size",
    Icon: Box,
    options: PROPERTY_SIZES.map(({ min, max }) => ({
      label: formatRangeLabel(min, max, "m²"),
      value: max ? `${min}-${max}` : `${min}`,
    })),
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

  return options && options.length ? [options[0], ...options.slice(1)] : null;
}

function formatRangeLabel(min: number, max: number | null, unit: string) {
  return max
    ? `${formatWithComma(min)}${unit} - ${formatWithComma(max)}${unit}`
    : `${formatWithComma(min)}${unit}+`;
}
