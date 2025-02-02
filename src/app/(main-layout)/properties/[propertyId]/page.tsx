import { notFound } from "next/navigation";
import { CTA } from "@/components/ui/cta";
import { FAQsSection } from "@/components/ui/faqs-section";
import { HeroSection } from "@/containers/property-page/hero-section";
import { PricingSection } from "@/containers/property-page/pricing-section";
import { SpecificPropertyInquiryFormSection } from "@/containers/property-page/specific-property-inquiry-form-section";
import { generatePropertyPageMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";

type PageParams = {
  params: { propertyId: string };
};

export async function generateMetadata({ params: { propertyId } }: PageParams) {
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!property) {
    notFound();
  }

  return generatePropertyPageMetadata(property);
}

export default async function Page({ params: { propertyId } }: PageParams) {
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!property) {
    notFound();
  }

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
