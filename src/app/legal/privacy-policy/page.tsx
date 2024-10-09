import { Navbar } from "@/containers/legal-layout/nav-bar";
import { Section } from "@/containers/legal-layout/section";
import { PRIVACY_POLICY_PAGE_METADATA } from "@/constant";
import { PRIVACY_POLICY } from "@/constant/privacy-policy";

export const metadata = PRIVACY_POLICY_PAGE_METADATA;

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
