import {
  CarouselSection,
  CarouselItem,
} from "@/components/ui/carousel-section";
import { TESTIMONIALS } from "@/constant";
import { TestimonialCard } from "./testimonial-card";

export function TestimonialsSection() {
  return (
    <CarouselSection
      id="testimonials"
      title="What Our Clients Say"
      paragraph="Read the success stories and heartfelt testimonials from our valued clients. Discover why they chose Estatein for their real estate needs."
      link="/about#clients"
      sectionName="Testimonials"
    >
      {TESTIMONIALS.map((testimonial) => (
        <CarouselItem
          key={testimonial.name}
          className="md:basis-1/2 md:pl-5 xl:basis-1/3"
        >
          <TestimonialCard {...testimonial} />
        </CarouselItem>
      ))}
    </CarouselSection>
  );
}
