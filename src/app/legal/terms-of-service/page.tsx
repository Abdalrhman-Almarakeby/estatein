import { Navbar } from "@/containers/legal-layout/nav-bar";
import { Section } from "@/containers/legal-layout/section";
import { TERMS_OF_SERVICE_PAGE_METADATA } from "@/constant";
import { TERMS_OF_SERVICE } from "@/constant/terms-of-service";

export const metadata = TERMS_OF_SERVICE_PAGE_METADATA;

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
