import { Section, SectionTitle } from "@/components/ui/section";
import { ACHIEVEMENTS } from "@/content";

export function AchievementsSection() {
  return (
    <Section id="our-achievements">
      <SectionTitle
        title="Our Achievements"
        paragraph="Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary."
      />
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-7.5 xl:grid-cols-3 xl:gap-10">
        {ACHIEVEMENTS.map(({ title, paragraph }) => (
          <div
            key={title}
            className="flex flex-col gap-4 rounded-[10px] border p-7.5 shadow-[0_0_0_4px_#191919] lg:gap-6 lg:p-10 2xl:gap-7.5 2xl:p-12.5"
          >
            <h4 className="text-secondary text-lg font-semibold lg:text-xl 3xl:text-2xl">
              {title}
            </h4>
            <p className="text-primary">{paragraph}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
