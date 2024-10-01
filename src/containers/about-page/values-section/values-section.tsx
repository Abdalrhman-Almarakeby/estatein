import { DataCard } from "@/components/ui/data-card";
import { SectionTitle } from "@/components/ui/section";
import { VALUES } from "@/constant";

export function ValuesSection() {
  return (
    <section
      className="flex flex-col gap-10 xl:flex-row xl:gap-15"
      id="our-values"
    >
      <SectionTitle
        title="Our Values"
        paragraph="Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary."
        className="xl:mb-20 xl:self-center"
      />
      <div className="grid gap-2.5 rounded-xl bg-gray-darker p-2.5 sm:grid-cols-2">
        {VALUES.map((serviceData) => (
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
