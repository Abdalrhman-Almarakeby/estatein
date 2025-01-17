import { Navbar } from "@/containers/legal-layout/nav-bar";
import { Section } from "@/containers/legal-layout/section";
import { generateSEOMetadata } from "@/lib/metadata";
import { PRIVACY_POLICY } from "@/content";

export const metadata = generateSEOMetadata({
  title: "Terms of Service - Estatein",
  description:
    "Read the Terms of Service for Estatein, which outline the rules and guidelines for using our services. By accessing or using our website, you agree to comply with these terms.",
  keywords: [
    "Terms of Service",
    "Estatein",
    "user agreement",
    "website terms",
    "services",
    "legal",
    "rules",
    "conditions",
  ],
});

export default function Page() {
  return (
    <div className="container space-y-16 px-6 pt-12 sm:!container">
      <header className="space-y-8">
        <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
        <Navbar links={PRIVACY_POLICY.map(({ title }) => title)} />
      </header>
      <main>
        {PRIVACY_POLICY.map((sectionData) => (
          <Section key={sectionData.title} {...sectionData} />
        ))}
      </main>
    </div>
  );
}
