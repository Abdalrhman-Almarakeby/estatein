import { Property } from "@prisma/client";
import { cn } from "@/lib/utils";
import { PropertyImage } from "./property-card-image";
import { PropertyInfo } from "./property-card-info";

type PropertyCardProps = Pick<
  Property,
  | "id"
  | "title"
  | "description"
  | "bathrooms"
  | "bedrooms"
  | "images"
  | "listingPrice"
  | "propertyType"
  | "area"
> & {
  className?: string;
};

export function PropertyCard({
  id,
  title,
  description,
  bedrooms,
  bathrooms,
  images,
  listingPrice,
  className,
  propertyType,
  area,
}: PropertyCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-xl border p-5 lg:gap-5 lg:p-7.5",
        className,
      )}
    >
      <PropertyImage src={images[0]} alt={title} />
      <PropertyInfo
        id={id}
        title={title}
        description={description}
        listingPrice={listingPrice}
        bathrooms={bathrooms}
        bedrooms={bedrooms}
        propertyType={propertyType}
        area={area}
      />
    </div>
  );
}
