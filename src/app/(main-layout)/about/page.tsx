import { CTA } from "@/components/ui/cta";
import { AchievementsSection } from "@/containers/about-page/achievements-section";
import { ClientsSection } from "@/containers/about-page/clients-section";
import { HeroSection } from "@/containers/about-page/hero-section";
import { HowItIsWorkSection } from "@/containers/about-page/how-it-is-work-section";
import { TeamSection } from "@/containers/about-page/team-section";
import { ValuesSection } from "@/containers/about-page/values-section";
import { ABOUT_PAGE_METADATA } from "@/constant";

export const metadata = ABOUT_PAGE_METADATA;

export default function Page() {
  return (
    <main className="page-spacing flex-grow">
      <HeroSection />
      <ValuesSection />
      <AchievementsSection />
      <HowItIsWorkSection />
      <TeamSection />
      <ClientsSection />
      <CTA />
    </main>
  );
}
