"use client";

import { Property } from "@prisma/client";
import {
  CarouselItem,
  CarouselSection,
} from "@/components/ui/carousel-section";
import { PropertyCard } from "@/components/ui/property-card";
import { usePropertiesFilters } from "@/contexts/properties-filters";
import { PropertiesFilters } from "@/lib/schemas";

type PropertiesCardsProps = {
  properties: Pick<
    Property,
    | "id"
    | "title"
    | "description"
    | "bedrooms"
    | "bathrooms"
    | "images"
    | "listingPrice"
    | "propertyType"
    | "area"
  >[];
};

export function PropertiesCards({ properties }: PropertiesCardsProps) {
  const { watch } = usePropertiesFilters();

  const filters = watch();

  function filterProperties(
    properties: Pick<
      Property,
      | "id"
      | "title"
      | "description"
      | "bedrooms"
      | "bathrooms"
      | "images"
      | "listingPrice"
      | "propertyType"
      | "area"
    >[],
    filters: PropertiesFilters,
  ) {
    // TODO: Implement real validation
    // eslint-disable-next-line no-console
    console.log(filters);
    return properties;
  }

  const filteredProperties = filterProperties(properties, filters);

  return (
    <CarouselSection
      id="properties"
      title="Discover a World of Possibilities"
      paragraph="Our portfolio of properties is as diverse as your dreams. Explore the following categories to find the perfect property that resonates with your vision of home"
      viewAll={false}
      headingLevel={2}
    >
      {filteredProperties.map((propertyData) => {
        return (
          <CarouselItem
            key={propertyData.id}
            className="md:basis-1/2 md:pl-5 xl:basis-1/3"
          >
            <PropertyCard {...propertyData} />
          </CarouselItem>
        );
      })}
    </CarouselSection>
  );
}
