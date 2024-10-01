import { Section, SectionTitle } from "@/components/ui/section";
import { ContactForm } from "./contact-form";

export function ContactFormSection() {
  return (
    <Section id="contact">
      <SectionTitle
        title="Let's Connect"
        level={2}
        paragraph="We're excited to connect with you and learn more about your real estate goals. Use the form below to get in touch with Estatein."
      />
      <ContactForm />
    </Section>
  );
}
