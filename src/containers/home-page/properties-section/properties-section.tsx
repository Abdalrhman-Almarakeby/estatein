import {
  CarouselItem,
  CarouselSection,
} from "@/components/ui/carousel-section";
import { PropertyCard } from "@/components/ui/property-card";
import { prisma } from "@/lib/prisma";

export async function PropertiesSection() {
  const properties = await prisma.property.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      bedrooms: true,
      bathrooms: true,
      images: true,
      propertyType: true,
      listingPrice: true,
      area: true,
    },
  });

  return (
    <CarouselSection
      id="featured-properties"
      title="Featured Properties"
      paragraph="Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through Estatein."
      link="/properties"
      sectionName="Properties"
    >
      {properties.map((propertyData) => {
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
