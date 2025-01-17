import { CTA } from "@/components/ui/cta";
import { FAQsSection } from "@/components/ui/faqs-section";
import { HeroSection } from "@/containers/home-page/hero-section";
import { PropertiesSection } from "@/containers/home-page/properties-section";
import { TestimonialsSection } from "@/containers/home-page/testimonials-section";
import { generateSEOMetadata } from "@/lib/metadata";

export const metadata = generateSEOMetadata({
  title:
    "Estatein - Your Ultimate Real Estate Destination | Discover Properties",
  description:
    "Welcome to Estatein! Find your perfect home, explore top property listings, and connect with trusted real estate agents. Your dream property is just a click away.",
  keywords:
    "real estate, property listings, home search, real estate agents, dream home",
});

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
