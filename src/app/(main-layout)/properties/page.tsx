import { CTA } from "@/components/ui/cta";
import { HeaderSection } from "@/components/ui/header-section";
import { FiltersForm } from "@/containers/properties-page/filters-form";
import { PropertiesInquiryFormSection } from "@/containers/properties-page/properties-inquiry-form-section";
import { PropertiesSection } from "@/containers/properties-page/properties-section";
import { PROPERTIES_PAGE_METADATA } from "@/constant";
import { PropertiesFiltersProvider } from "@/contexts/properties-filters";

export const metadata = PROPERTIES_PAGE_METADATA;

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
