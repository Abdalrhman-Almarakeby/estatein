import { formatWithComma } from "./string";

export function formatTwoDigits(num: number): string {
  return num < 10 ? `0${num}` : num.toString();
}

export function formatPrice(amount: number): string {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en", { notation: "compact" }).format(value);
}

export function formatRangeLabel(
  min: number,
  max: number,
  unit: string,
): string {
  const formattedMin = formatWithComma(min);
  const formattedMax =
    max === Number.MAX_SAFE_INTEGER
      ? `${formattedMin}${unit}+`
      : `${formattedMin}${unit} - ${formatWithComma(max)}${unit}`;

  return formattedMax;
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

export function calculateGrowthPercent(
  current: number,
  previous: number,
): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}
