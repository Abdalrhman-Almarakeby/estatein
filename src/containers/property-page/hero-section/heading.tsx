import { formatPrice } from "@/lib/utils";
import LocationIconSVG from "@/assets/icons/location.svg";

type HeroHeadingProps = {
  title: string;
  location: string;
  listingPrice: number;
};

export function Heading({ listingPrice, location, title }: HeroHeadingProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-4 md:gap-4 xl:gap-5">
      <h2 className="basis-full text-2xl font-semibold sm:text-3xl md:basis-auto">
        {title}
      </h2>
      <div className="order-last flex w-fit items-center gap-1 rounded-md border p-2 text-sm xs:order-none md:mr-auto md:self-end xl:p-2.5 xl:text-base 2xl:text-lg">
        <LocationIconSVG className="size-5 xl:size-6 [&>*]:!fill-white" />
        <span>{location}</span>
      </div>
      <p className="flex basis-full flex-col gap-1.5 xs:basis-auto xs:flex-row xs:items-center md:flex-col md:items-start md:gap-1">
        <span className="text-sm text-gray-light xl:text-base 2xl:text-lg">
          Price{" "}
        </span>
        <span className="text-lg font-semibold lg:text-xl xl:text-[1.375rem] 2xl:text-2xl">
          {formatPrice(listingPrice)}
        </span>
      </p>
    </div>
  );
}
