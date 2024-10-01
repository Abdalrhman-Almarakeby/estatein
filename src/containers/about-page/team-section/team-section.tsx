import { Section, SectionTitle } from "@/components/ui/section";
import { TEAM_DATA } from "@/constant";
import { TeamMemberCard } from "./team-member-card";

export function TeamSection() {
  return (
    <Section id="team">
      <SectionTitle
        title="Meet the Estatein Team"
        paragraph="At Estatein, our success is driven by the dedication and expertise of our team. Get to know the people behind our mission to make your real estate dreams a reality."
      />
      <div className="grid gap-5 min-[450px]:grid-cols-2 xl:grid-cols-4">
        {TEAM_DATA.map((memberData) => (
          <TeamMemberCard key={memberData.name} {...memberData} />
        ))}
      </div>
    </Section>
  );
}
