import { CTA } from "@/components/ui/cta";
import { HeaderSection } from "@/components/ui/header-section";
import { FiltersForm } from "@/containers/properties-page/filters-form";
import { PropertiesInquiryFormSection } from "@/containers/properties-page/properties-inquiry-form-section";
import { PropertiesSection } from "@/containers/properties-page/properties-section";
import { PropertiesFiltersProvider } from "@/contexts/properties-filters";
import { generateAppMetadata } from "@/lib/metadata";

export const metadata = generateAppMetadata({
  title: "Properties - Estatein | Discover the Best Real Estate Listings",
  description:
    "Explore a diverse range of real estate properties with Estatein. Find your dream home, investment property, or rental with ease. Browse our listings today and discover the best properties available.",
  keywords:
    "real estate, properties, homes for sale, investment properties, rentals, buy property, estate listings",
});

export default function Page() {
  return (
    <main className="page-spacing flex-grow">
      <PropertiesFiltersProvider>
        <div className="space-y-5">
          <HeaderSection
            paragraph="Welcome to Estatein, where your dream property awaits in every corner of our beautiful world. Explore our curated selection of properties, each offering a unique story and a chance to redefine your life. With categories to suit every dreamer, your journey."
            title="Find Your Dream Property"
          />
          <FiltersForm />
        </div>
        <PropertiesSection />
      </PropertiesFiltersProvider>
      <PropertiesInquiryFormSection />
      <CTA />
    </main>
  );
}
