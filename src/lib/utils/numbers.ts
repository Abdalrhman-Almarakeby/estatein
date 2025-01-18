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

export function formatNumberWithLetter(num: number): string {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B`;
  }

  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }

  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  }

  return num.toString();
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
