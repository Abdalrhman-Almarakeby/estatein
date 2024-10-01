import { unstable_cache as cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const getProperties = cache(async () => {
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
