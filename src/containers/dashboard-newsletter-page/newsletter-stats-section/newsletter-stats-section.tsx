import { NewsletterStats, NewsletterStatsData } from "./newsletter-stats";

type NewsletterStatsSectionProps = {
  stats: NewsletterStatsData;
};

export function NewsletterStatsSection({ stats }: NewsletterStatsSectionProps) {
  return (
    <section className="grid gap-8">
      <h2 className="text-xl font-bold">Subscriptions Statistics</h2>
      <NewsletterStats stats={stats} />
    </section>
  );
}
