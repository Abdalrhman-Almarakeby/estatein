import AreaSVG from "@/assets/icons/area.svg";
import BathSVG from "@/assets/icons/bath.svg";
import BedSVG from "@/assets/icons/bed.svg";
import BuildingSVG from "@/assets/icons/building.svg";

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
        <BedSVG aria-hidden="true" /> <span>{bedrooms}-Bedroom</span>
      </span>
      <span aria-label={`${bathrooms} bathrooms`}>
        <BathSVG aria-hidden="true" /> <span>{bathrooms}-Bathroom</span>
      </span>
      <span aria-label={propertyType}>
        <BuildingSVG aria-hidden="true" /> <span>{propertyType}</span>
      </span>
      <span aria-label={propertyType}>
        <AreaSVG aria-hidden="true" className="[&_*]:!fill-white" />{" "}
        <span>{area} ft²</span>
      </span>
    </div>
  );
};
