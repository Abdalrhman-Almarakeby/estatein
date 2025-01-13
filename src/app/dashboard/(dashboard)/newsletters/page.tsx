import { NewsletterDataSection } from "@/containers/dashboard-newsletter-page/newsletter-data-section";
import { NewsletterStatsSection } from "@/containers/dashboard-newsletter-page/newsletter-stats-section";
import {
  getNewsletterStats,
  getSubscribers,
} from "@/server/db/newsletter-subscriber";

export default async function Page() {
  const [stats, subscribers] = await Promise.all([
    getNewsletterStats(),
    getSubscribers(),
  ]);

  return (
    <div className="min-h-screen container py-12">
      <h1 className="text-3xl font-bold mb-12">
        Newsletter Subscription Dashboard
      </h1>

      <div className="border p-6 grid gap-14 overflow-hidden shadow-xl sm:rounded-lg">
        <NewsletterStatsSection stats={stats} />
        <NewsletterDataSection subscribers={subscribers} />
      </div>
    </div>
  );
}
