import { Section, SectionTitle } from "@/components/ui/section";
import { OfficeLocations } from "./office-locations";

export function OfficeLocationsSection() {
  return (
    <Section id="offices">
      <SectionTitle
        title="Discover Our Office Locations"
        paragraph="Estatein is here to serve you across multiple locations. Whether you're looking to meet our team."
      />
      <OfficeLocations />
    </Section>
  );
}
