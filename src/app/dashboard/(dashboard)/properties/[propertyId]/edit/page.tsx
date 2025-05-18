import { notFound } from "next/navigation";
import { EditPropertySection } from "@/containers/dashboard-properties-new-page/edit-property-section";
import { generateNonSEOMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";

type PageParams = {
  params: { propertyId: string };
};

export async function generateMetadata({ params: { propertyId } }: PageParams) {
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!property) {
    notFound();
  }

  return generateNonSEOMetadata({
    title: `Edit ${property.title} - Estatein`,
    description: `Update details for ${property.title} in the system.`,
  });
}

export default async function Page({ params: { propertyId } }: PageParams) {
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!property) {
    notFound();
  }

  return (
    <EditPropertySection propertyId={propertyId} propertyData={property} />
  );
}
