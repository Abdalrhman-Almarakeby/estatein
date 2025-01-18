import { DataCard } from "@/components/ui/data-card";
import { SectionTitle } from "@/components/ui/section";
import { CTACard } from "@/containers/services-page/cta-card";
import { INVESTMENT_SERVICES_DATA } from "@/content";

export function InvestmentSection() {
  return (
    <section
      id="investments"
      className="flex flex-col items-center gap-10 xl:flex-row xl:gap-15"
    >
      <div className="grid gap-7.5 md:grid-cols-2 xl:grid-cols-1 xl:gap-10">
        <SectionTitle
          title="Smart Investments, Informed Decisions"
          paragraph="Building a real estate portfolio requires a strategic approach. Estatein's Investment Advisory Service empowers you to make smart investments and informed decisions."
          className="md:place-self-center"
        />
        <CTACard
          link="/contact#contact"
          paragraph="Explore our Property Management Service categories and let us handle the complexities while you enjoy the benefits of property ownership."
          title="Unlock Your Investment Potential"
        />
      </div>
      <div className="grid gap-2.5 rounded-xl bg-gray-darker p-2.5 sm:grid-cols-2">
        {INVESTMENT_SERVICES_DATA.map((serviceData) => (
          <DataCard
            key={serviceData.title}
            {...serviceData}
            className="bg-gray-darkest"
          />
        ))}
      </div>
    </section>
  );
}
