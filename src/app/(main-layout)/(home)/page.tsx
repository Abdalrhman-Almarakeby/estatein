import { CTA } from "@/components/ui/cta";
import { FAQsSection } from "@/components/ui/faqs-section";
import { HeroSection } from "@/containers/home-page/hero-section";
import { PropertiesSection } from "@/containers/home-page/properties-section";
import { TestimonialsSection } from "@/containers/home-page/testimonials-section";
import { HOME_PAGE_METADATA } from "@/constant";

export const metadata = HOME_PAGE_METADATA;

export default function Page() {
  return (
    <main className="page-spacing flex-grow bg-gray-darkest">
      <HeroSection />
      <PropertiesSection />
      <TestimonialsSection />
      <FAQsSection />
      <CTA />
    </main>
  );
}
