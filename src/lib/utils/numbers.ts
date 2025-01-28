import { formatWithComma } from "./string";

export function formatTwoDigits(num: number): string {
  return num < 10 ? `0${num}` : num.toString();
}

export function formatPrice(number: number): string {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function formatCompactNumber(number: number): string {
  return Intl.NumberFormat("en", {
    notation: "compact",
  }).format(number);
}

export function formatRangeLabel(
  min: number,
  max: number,
  unit: string,
): string {
  return max === Number.MAX_SAFE_INTEGER
    ? `${formatWithComma(min)}${unit}+`
    : `${formatWithComma(min)}${unit} - ${formatWithComma(max)}${unit}`;
}

export function createRangeOptions(
  ranges: readonly { min: number; max: number }[],
  unit: string,
) {
  return ranges.map(({ min, max }) => ({
    label: formatRangeLabel(min, max, unit),
    value: max === Number.MAX_SAFE_INTEGER ? `${min}` : `${min}-${max}`,
  }));
}

export function calculateGrowthPercent(current: number, previous: number) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}
