import { unstable_cache as cache, revalidateTag } from "next/cache";
import { notFound } from "next/navigation";
import { Property } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const PROPERTY_CACHE_TAG = "property-data";

export const getProperties = cache(async () => {
  return await prisma.property.findMany();
}, [PROPERTY_CACHE_TAG]);

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
}, [PROPERTY_CACHE_TAG]);

export const getPropertyDetails = cache(
  async (id: string) => {
    const property = await prisma.property.findUnique({
      where: {
        id,
      },
    });

    if (!property) {
      notFound();
    }

    return property;
  },
  [PROPERTY_CACHE_TAG],
);

export const propertyExistsById = cache(
  async (id: string) => {
    const property = await prisma.property.findUnique({
      where: { id },
      select: { id: true },
    });

    return !!property;
  },
  [PROPERTY_CACHE_TAG],
);

export const propertyExistsByName = cache(
  async (title: string) => {
    const property = await prisma.property.findUnique({
      where: { title },
      select: { title: true },
    });

    return !!property;
  },
  [PROPERTY_CACHE_TAG],
);

export async function createProperty(
  data: Omit<Property, "id" | "inquiries" | "updatedAt" | "createdAt">,
) {
  const property = await prisma.property.create({
    data,
  });

  revalidateTag(PROPERTY_CACHE_TAG);

  return property;
}

export async function updateProperty(id: string, data: Partial<Property>) {
  const property = await prisma.property.update({
    where: { id },
    data,
  });

  revalidateTag(PROPERTY_CACHE_TAG);

  return property;
}

export async function deleteProperty(id: string) {
  const property = await prisma.property.delete({
    where: { id },
  });

  revalidateTag(PROPERTY_CACHE_TAG);

  return property;
}
