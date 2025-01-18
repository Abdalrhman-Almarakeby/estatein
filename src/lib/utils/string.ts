export function upperFirst(input: string): string {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function normalize(input: string): string {
  return input.toLowerCase().replace(/[_-]/g, " ");
}

export function toKebabCase(input: string): string {
  return input.replace(/[\s_]+/g, "-").toLowerCase();
}

export function formatWithComma(number: number): string {
  return number.toLocaleString("en-US");
}

export function formatPropertySize(input: string) {
  const [min, max] = input
    .split("-")
    .map((element) => formatWithComma(+element));
  return max ? `${min}m² - ${max}m²` : `${min}m²`;
}

export function formatPricingRange(input: string) {
  const [min, max] = input
    .split("-")
    .map((element) => formatWithComma(+element));
  return max ? `${min}$ - ${max}$` : `${min}$`;
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}
