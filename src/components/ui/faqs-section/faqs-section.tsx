import {
  CarouselItem,
  CarouselSection,
} from "@/components/ui/carousel-section";
import { FAQS } from "@/content";
import { FAQCard } from "./faq-card";

export function FAQsSection() {
  return (
    <CarouselSection
      id="faqs"
      title="Frequently Asked Questions"
      paragraph="Find answers to common questions about Estatein's services, property listings, and the real estate process. We're here to provide clarity and assist you every step of the way."
      link="/about"
      sectionName="FAQs"
    >
      {FAQS.map((faq) => (
        <CarouselItem
          key={faq.question}
          className="md:basis-1/2 md:pl-5 xl:basis-1/3"
        >
          <FAQCard {...faq} />
        </CarouselItem>
      ))}
    </CarouselSection>
  );
}
