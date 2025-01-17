import { subDays, subMonths, subWeeks } from "date-fns";
import { NewsletterDataSection } from "@/containers/dashboard-newsletter-page/newsletter-data-section";
import { NewsletterStatsSection } from "@/containers/dashboard-newsletter-page/newsletter-stats-section";
import { generateNonSEOMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";

export const metadata = generateNonSEOMetadata({
  title: "Newsletter - Estatein",
  description: "View subscription stats and download subscribes data.",
});

async function getNewsletterStats() {
  const now = new Date();
  const oneDayAgo = subDays(now, 1);
  const oneWeekAgo = subWeeks(now, 1);
  const oneMonthAgo = subMonths(now, 1);
  const twoDaysAgo = subDays(now, 2);
  const twoWeeksAgo = subWeeks(now, 2);
  const twoMonthsAgo = subMonths(now, 2);

  const [
    totalSubscribers,
    lastDaySubscribers,
    lastWeekSubscribers,
    lastMonthSubscribers,
    previousDaySubscribers,
    previousWeekSubscribers,
    previousMonthSubscribers,
  ] = await Promise.all([
    prisma.newsletterSubscriber.count(),
    prisma.newsletterSubscriber.count({
      where: { subscribedAt: { gte: oneDayAgo } },
    }),
    prisma.newsletterSubscriber.count({
      where: { subscribedAt: { gte: oneWeekAgo } },
    }),
    prisma.newsletterSubscriber.count({
      where: { subscribedAt: { gte: oneMonthAgo } },
    }),
    prisma.newsletterSubscriber.count({
      where: { subscribedAt: { gte: twoDaysAgo, lt: oneDayAgo } },
    }),
    prisma.newsletterSubscriber.count({
      where: { subscribedAt: { gte: twoWeeksAgo, lt: oneWeekAgo } },
    }),
    prisma.newsletterSubscriber.count({
      where: { subscribedAt: { gte: twoMonthsAgo, lt: oneMonthAgo } },
    }),
  ]);

  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  return {
    day: {
      count: lastDaySubscribers,
      growth: calculateGrowth(lastDaySubscribers, previousDaySubscribers),
    },
    week: {
      count: lastWeekSubscribers,
      growth: calculateGrowth(lastWeekSubscribers, previousWeekSubscribers),
    },
    month: {
      count: lastMonthSubscribers,
      growth: calculateGrowth(lastMonthSubscribers, previousMonthSubscribers),
    },
    total: {
      count: totalSubscribers,
    },
  };
}

async function getSubscribers() {
  return prisma.newsletterSubscriber.findMany({
    select: {
      email: true,
      subscribedAt: true,
    },
    orderBy: {
      subscribedAt: "desc",
    },
  });
}

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
