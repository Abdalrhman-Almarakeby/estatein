import { unstable_cache as cache } from "next/cache";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const getProperty = cache(async (id: string) => {
  const property = await prisma.property.findUnique({
    where: {
      id,
    },
  });

  if (!property) {
    notFound();
  }

  return property;
});
