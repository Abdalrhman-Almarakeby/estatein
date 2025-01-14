import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from "next/cache";
import { subDays, subMonths, subWeeks } from "date-fns";
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

export const getNewsletterStats = async () => {
  noStore();
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
};

export const getSubscribers = async () => {
  noStore();
  return prisma.newsletterSubscriber.findMany({
    select: {
      email: true,
      subscribedAt: true,
    },
    orderBy: {
      subscribedAt: "desc",
    },
  });
};
