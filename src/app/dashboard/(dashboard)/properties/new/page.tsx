import { CreateNewPropertySection } from "@/containers/dashboard-properties-new-page/create-new-property-section/create-new-property-section";
import { generateNonSEOMetadata } from "@/lib/metadata";

export const metadata = generateNonSEOMetadata({
  title: "Create Property - Estatein",
  description: "Add a new property to the system.",
});

export default function Page() {
  return (
    <>
      <CreateNewPropertySection />
    </>
  );
}
