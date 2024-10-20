import {
  CarouselItem,
  CarouselSection,
} from "@/components/ui/carousel-section";
import {
  PropertyCard,
  PropertyCardSkeleton,
} from "@/components/ui/property-card";
import { getProperties } from "@/data/properties";

export async function PropertiesSection() {
  const properties = await getProperties();

  return (
    <CarouselSection
      id="featured-properties"
      title="Featured Properties"
      paragraph="Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through Estatein."
      link="/properties"
      sectionName="Properties"
    >
      {properties &&
        properties.map((propertyData) => {
          return (
            <CarouselItem
              key={propertyData.id}
              className="md:basis-1/2 md:pl-5 xl:basis-1/3"
            >
              <PropertyCard {...propertyData} />
            </CarouselItem>
          );
        })}
      {!properties &&
        Array.from({ length: 10 }).map((_, i) => (
          <CarouselItem key={i} className="md:basis-1/2 md:pl-5 xl:basis-1/3">
            <PropertyCardSkeleton />
          </CarouselItem>
        ))}
    </CarouselSection>
  );
}
