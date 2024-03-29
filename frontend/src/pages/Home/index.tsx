import { useFetch } from "@/lib/hooks/useFetch";
import { type Property } from "@/types/property";
import { testimonials } from "@/constant/testimonials";
import { faqs } from "@/constant/faqs";
import { PropertyCard, PropertyCardSkelton } from "@/components/ui/PropertyCard";
import TestimonialCard from "@/components/ui/TestimonialCard";
import FAQCard from "@/components/ui/FAQCard";
import HeroSection from "./HeroSection";
import { HomeCarouselSection, CarouselItem } from "./HomeCarouselSection";
import CTASection from "./CTASection";

const PROPERTIES_TO_DISPLAY = 60;

export default function Home() {
  const { data: propertiesData } = useFetch<Property[]>(
    `http://localhost:8080/properties?limit=${PROPERTIES_TO_DISPLAY}`
  );

  return (
    <main className="flex-grow bg-gray-08">
      <div className="container space-y-20 lg:space-y-30">
        <HeroSection />

        <HomeCarouselSection
          id="featured-properties"
          title="Featured Properties"
          paragraph="Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through Estatein."
          link="/properties"
          sectionName="Properties"
        >
          {propertiesData
            ? propertiesData.map((propertyData) => {
                return (
                  <CarouselItem
                    key={propertyData._id}
                    className="md:basis-1/2 md:pl-5 xl:basis-1/3"
                  >
                    <PropertyCard {...propertyData} />
                  </CarouselItem>
                );
              })
            : Array.from({ length: PROPERTIES_TO_DISPLAY }).map((_, i) => (
                <CarouselItem key={i} className="md:basis-1/2 md:pl-5 xl:basis-1/3">
                  <PropertyCardSkelton />
                </CarouselItem>
              ))}
        </HomeCarouselSection>

        <HomeCarouselSection
          id="testimonials"
          title="What Our Clients Say"
          paragraph="Read the success stories and heartfelt testimonials from our valued clients. Discover why they chose Estatein for their real estate needs."
          link="/about#clients"
          sectionName="Testimonials"
        >
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.name} className="md:basis-1/2 md:pl-5 xl:basis-1/3">
              <TestimonialCard {...testimonial} />
            </CarouselItem>
          ))}
        </HomeCarouselSection>

        <HomeCarouselSection
          id="faqs"
          title="Frequently Asked Questions"
          paragraph="Find answers to common questions about Estatein's services, property listings, and the real estate process. We're here to provide clarity and assist you every step of the way."
          link="/about"
          sectionName="FAQs"
        >
          {faqs.map((faq) => (
            <CarouselItem key={faq.question} className="md:basis-1/2 md:pl-5 xl:basis-1/3">
              <FAQCard {...faq} />
            </CarouselItem>
          ))}
        </HomeCarouselSection>
        <CTASection />
      </div>
    </main>
  );
}
