import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { PropertyBadges } from "./property-card-badges";

type PropertyInfoProps = {
  id: string;
  title: string;
  description: string;
  listingPrice: number;
  bathrooms: number;
  bedrooms: number;
  propertyType: string;
  area: number;
};

export const PropertyInfo = ({
  id,
  title,
  description,
  listingPrice,
  bathrooms,
  bedrooms,
  propertyType,
  area,
}: PropertyInfoProps) => {
  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h3 className="text-lg lg:text-xl 3xl:text-2xl">{title}</h3>{" "}
        <p className="text-primary line-clamp-2">{description}</p>
      </div>
      <PropertyBadges
        bedrooms={bedrooms}
        bathrooms={bathrooms}
        propertyType={propertyType}
        area={area}
      />
      <div className="flex flex-col gap-7.5 xs:flex-row xs:items-center sm:!mt-8 sm:justify-between md:!mt-5">
        <p className="grid">
          <span className="text-primary">Price</span>
          <span className="text-lg">{formatPrice(listingPrice)}</span>
        </p>
        <Link
          href={`/properties/${id}`}
          className="btn-primary btn-sm 3xl:btn-md flex-grow text-center sm:flex-grow-0 sm:basis-1/2 md:flex-grow 3xl:text-lg"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};
