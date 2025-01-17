import { CTA } from "@/components/ui/cta";
import { AchievementsSection } from "@/containers/about-page/achievements-section";
import { ClientsSection } from "@/containers/about-page/clients-section";
import { HeroSection } from "@/containers/about-page/hero-section";
import { HowItIsWorkSection } from "@/containers/about-page/how-it-is-work-section";
import { TeamSection } from "@/containers/about-page/team-section";
import { ValuesSection } from "@/containers/about-page/values-section";
import { generateAppMetadata } from "@/lib/metadata";

export const metadata = generateAppMetadata({
  title: "About Estatein | Our Story & Vision in Real Estate",
  description:
    "Learn more about Estatein, our mission to simplify your real estate journey, and our commitment to helping you find the perfect property. Discover who we are and what drives us.",
  keywords:
    "about Estatein, real estate mission, company vision, real estate services",
});

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
