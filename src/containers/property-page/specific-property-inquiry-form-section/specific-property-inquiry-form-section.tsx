import { Section, SectionTitle } from "@/components/ui/section";
import { SpecificPropertyInquiryForm } from "./specific-property-inquiry-form";

type SpecificPropertyInquiryFormSectionProps = {
  propertyTitle: string;
  propertyId: string;
};

export function SpecificPropertyInquiryFormSection({
  propertyId,
  propertyTitle,
}: SpecificPropertyInquiryFormSectionProps) {
  return (
    <Section id="inquire">
      <SectionTitle
        title={`Inquire About ${propertyTitle}`}
        paragraph="Interested in this property? Fill out the form below, and our real estate experts will get back to you with more details, including scheduling a viewing and answering any questions you may have."
      />
      <SpecificPropertyInquiryForm propertyId={propertyId} />
    </Section>
  );
}
