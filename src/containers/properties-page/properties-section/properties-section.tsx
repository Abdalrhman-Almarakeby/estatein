import { prisma } from "@/lib/prisma";
import { PropertiesCards } from "./properties-cards";

export async function PropertiesSection() {
  const properties = await prisma.property.findMany({
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

  return <PropertiesCards properties={properties} />;
}
