import { unstable_cache as cache } from "next/cache";
import { notFound } from "next/navigation";
import { Property } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const getProperties = cache(async () => {
  return await prisma.property.findMany();
});

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

export const propertyExistsById = cache(async (id: string) => {
  const property = await prisma.property.findUnique({
    where: { id },
    select: { id: true },
  });

  return !!property;
});

export const propertyExistsByName = cache(async (title: string) => {
  const property = await prisma.property.findUnique({
    where: { title },
    select: { title: true },
  });

  return !!property;
});

export async function createProperty(
  data: Omit<Property, "id" | "inquiries" | "updatedAt" | "createdAt">,
) {
  const property = await prisma.property.create({
    data,
  });

  return property;
}

export async function deleteProperty(id: string) {
  const property = await prisma.property.delete({
    where: { id },
  });

  return property;
}
