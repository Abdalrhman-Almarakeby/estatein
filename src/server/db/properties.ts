import { unstable_cache as cache } from "next/cache";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const getPropertiesSummaries = cache(async () => {
  return await prisma.property.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      bedrooms: true,
      bathrooms: true,
      images: true,
      propertyType: true,
      listingPrice: true,
      area: true,
    },
  });
});

export const getPropertyDetails = cache(async (id: string) => {
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
