import { Bath, BedDouble, Building, Grid2x2 } from "lucide-react";
import { normalize, upperFirst } from "@/lib/utils";

type PropertyBadgesProps = {
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  area: number;
};

export const PropertyBadges = ({
  bedrooms,
  bathrooms,
  propertyType,
  area,
}: PropertyBadgesProps) => {
  return (
    <div className="xs:text-secondary text-secondary *:badge flex flex-wrap gap-1.5 text-xs 3xl:text-base">
      <span aria-label={`${bedrooms} bedrooms`}>
        <BedDouble aria-hidden="true" className="size-4" />{" "}
        <span>{bedrooms}-Bedroom</span>
      </span>
      <span aria-label={`${bathrooms} bathrooms`}>
        <Bath aria-hidden="true" className="size-4" />{" "}
        <span>{bathrooms}-Bathroom</span>
      </span>
      <span aria-label={upperFirst(normalize(propertyType))}>
        <Building aria-hidden="true" className="size-4" />{" "}
        <span>{upperFirst(normalize(propertyType))}</span>
      </span>
      <span aria-label={`${area} ft²`}>
        <Grid2x2 aria-hidden="true" className="size-4" />{" "}
        <span>{area} ft²</span>
      </span>
    </div>
  );
};
