import { Section, SectionTitle } from "@/components/ui/section";
import { PropertiesInquiryForm } from "./properties-inquiry-form";

export function PropertiesInquiryFormSection() {
  return (
    <Section id="contact">
      <SectionTitle
        title="Let's Make it Happen"
        paragraph="Ready to take the first step toward your dream property? Fill out the form below, and our real estate wizards will work their magic to find your perfect match. Don't wait; let's embark on this exciting journey together."
      />
      <PropertiesInquiryForm />
    </Section>
  );
}
