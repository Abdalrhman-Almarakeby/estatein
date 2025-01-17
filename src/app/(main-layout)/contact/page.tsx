import { Suspense } from "react";
import { CTA } from "@/components/ui/cta";
import { HeaderSection } from "@/components/ui/header-section";
import { LinksSection } from "@/components/ui/links-section";
import { ContactFormSection } from "@/containers/contact-page/contact-form-section";
import { GallerySection } from "@/containers/contact-page/gallery-section";
import { OfficeLocationsSection } from "@/containers/contact-page/office-locations-sections";
import { generateSEOMetadata } from "@/lib/metadata";
import { CONTACT_PAGE_LINKS_DATA } from "@/constant";

export const metadata = generateSEOMetadata({
  title: "Contact Estatein | Get in Touch for Real Estate Assistance",
  description:
    "Need help with your property search? Contact Estatein today! Our team is ready to assist with all your real estate needs. Reach out via phone, email, or our contact form.",
  keywords:
    "contact Estatein, real estate assistance, customer support, contact form, property inquiries",
});

export default function Page() {
  return (
    <main className="page-spacing flex-grow">
      <div>
        <HeaderSection
          title="Get in Touch with Estatein"
          paragraph="Welcome to Estatein's Contact Us page. We're here to assist you with any inquiries, requests, or feedback you may have. Whether you're looking to buy or sell a property, explore investment opportunities, or simply want to connect, we're just a message away. Reach out to us, and let's start a conversation."
        />
        <LinksSection linksData={CONTACT_PAGE_LINKS_DATA} />
      </div>
      <ContactFormSection />
      <Suspense>
        <OfficeLocationsSection />
      </Suspense>
      <GallerySection />
      <CTA />
    </main>
  );
}
