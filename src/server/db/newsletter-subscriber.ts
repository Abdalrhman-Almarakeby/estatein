import { unstable_cache as cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const newsletterSubscriberExists = cache(async (email: string) => {
  const newsletterSubscriber = await prisma.newsletterSubscriber.findFirst({
    where: {
      email: email,
    },
    select: {
      email: true,
    },
  });

  return !!newsletterSubscriber;
});

export const createNewsletterSubscriber = async (email: string) => {
  await prisma.newsletterSubscriber.create({
    data: {
      email,
    },
  });
};

export const getNewsletterStats = cache(async () => {
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  const twoMonthsAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

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
});

export const getSubscribers = cache(async () => {
  return prisma.newsletterSubscriber.findMany({
    select: {
      email: true,
      subscribedAt: true,
    },
    orderBy: {
      subscribedAt: "desc",
    },
  });
});
