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
