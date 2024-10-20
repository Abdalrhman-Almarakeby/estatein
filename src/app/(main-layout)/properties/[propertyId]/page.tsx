import { CTA } from "@/components/ui/cta";
import { FAQsSection } from "@/components/ui/faqs-section";
import { HeroSection } from "@/containers/property-page/hero-section";
import { PricingSection } from "@/containers/property-page/pricing-section";
import { SpecificPropertyInquiryFormSection } from "@/containers/property-page/specific-property-inquiry-form-section";
import { generatePropertyPageMetadata } from "@/lib/metadata";
import { getProperty } from "@/data/properties";

type PageParams = {
  params: { propertyId: string };
};

export async function generateMetadata({ params: { propertyId } }: PageParams) {
  const property = await getProperty(propertyId);
  return generatePropertyPageMetadata(property);
}

export default async function Page({ params: { propertyId } }: PageParams) {
  const property = await getProperty(propertyId);

  return (
    <main className="page-spacing container flex-grow pt-15">
      <HeroSection {...property} />
      <PricingSection {...property} />
      <SpecificPropertyInquiryFormSection
        propertyId={property.id}
        propertyTitle={property.title}
      />
      <FAQsSection />
      <CTA />
    </main>
  );
}
