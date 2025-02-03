export function upperFirst(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function normalize(input: string) {
  return input.toLowerCase().replace(/[_-]/g, " ");
}

export function toKebabCase(input: string) {
  return input.replace(/[\s_]+/g, "-").toLowerCase();
}

export function formatWithComma(number: number) {
  return number.toLocaleString("en-US");
}

export function formatRange(input: string, unit?: string) {
  const [min, max] = input
    .split("-")
    .map((element) => formatWithComma(+element));
  return max ? `${min}${unit} - ${max}${unit}` : `${min}${unit}`;
}

export function formatPropertySize(input: string) {
  return formatRange(input, "m²");
}

export function formatPricingRange(input: string) {
  return formatRange(input, "$");
}

export function generateId() {
  return Math.random().toString(36).slice(2, 9);
}
