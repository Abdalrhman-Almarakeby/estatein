import { Property } from "@prisma/client";
import { Heading } from "./heading";
import { ImagesCarousel } from "./images-carousel";
import { PropertyDescription } from "./property-description";
import { PropertyFeatures } from "./property-features";

type HeroSectionProps = Property;

export function HeroSection({
  title,
  location,
  listingPrice,
  images,
  description,
  bedrooms,
  bathrooms,
  area,
  features,
}: HeroSectionProps) {
  return (
    <section className="grid gap-5 lg:gap-7.5 xl:grid-cols-2">
      <div className="space-y-7.5 lg:space-y-10 xl:col-span-2">
        <Heading
          listingPrice={listingPrice}
          location={location}
          title={title}
        />
        <ImagesCarousel images={[...images]} />
      </div>
      <PropertyDescription
        area={area}
        bathrooms={bathrooms}
        bedrooms={bedrooms}
        description={description}
      />
      <PropertyFeatures features={features} />
    </section>
  );
}
