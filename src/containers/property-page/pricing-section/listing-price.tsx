import { cn, formatPrice } from "@/lib/utils";

type ListingPriceProps = {
  listingPrice: number;
  className?: string;
};

export function ListingPrice({ listingPrice, className }: ListingPriceProps) {
  return (
    <p className={cn("grid gap-2", className)}>
      <span className="flex items-center gap-1 text-sm text-gray-light lg:text-base xl:text-lg">
        Listing Price
      </span>
      <span className="text-2xl font-semibold text-white sm:text-3xl xl:text-4xl">
        {formatPrice(listingPrice)}
      </span>
    </p>
  );
}
