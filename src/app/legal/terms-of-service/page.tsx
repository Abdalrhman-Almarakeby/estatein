import { Navbar } from "@/containers/legal-layout/nav-bar";
import { Section } from "@/containers/legal-layout/section";
import { TERMS_OF_SERVICE } from "@/content";
import { generateSEOMetadata } from "@/lib/metadata";

export const metadata = generateSEOMetadata({
  title: "Privacy Policy - Estatein",
  description:
    "Our Privacy Policy explains how Estatein collects, uses, and protects your personal information. We value your privacy and are committed to safeguarding your data.",
  keywords: [
    "Privacy Policy",
    "Estatein",
    "data protection",
    "personal information",
    "user privacy",
    "information security",
    "data collection",
    "GDPR",
    "CCPA",
  ],
});
export default function Page() {
  return (
    <div className="container space-y-16 px-6 pt-12 sm:!container">
      <header className="space-y-8">
        <h1 className="text-4xl font-bold text-white">Terms of Service</h1>
        <Navbar links={TERMS_OF_SERVICE.map(({ title }) => title)} />
      </header>
      <main>
        {TERMS_OF_SERVICE.map((sectionData) => (
          <Section key={sectionData.title} {...sectionData} />
        ))}
      </main>
    </div>
  );
}
