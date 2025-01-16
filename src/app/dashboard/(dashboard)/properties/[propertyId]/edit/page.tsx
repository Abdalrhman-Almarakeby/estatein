import { notFound, redirect } from "next/navigation";
import { PropertyForm } from "@/containers/dashboard-properties-new-page/property-form/property-form";
import { generateDashboardMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";
import { PropertyData } from "@/lib/schemas";
import { updateProperty } from "@/server/actions/update-property";

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

  return generateDashboardMetadata({
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

  async function handleUpdateProperty(data: PropertyData) {
    "use server";

    const {
      success,
      data: updatedProperty,
      message,
    } = await updateProperty(propertyId, data);

    if (!success || !updatedProperty) {
      throw new Error(message || "Failed to update property");
    }

    redirect("/dashboard/properties");
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Edit Property</h1>
      <PropertyForm
        initialData={property}
        onSubmit={handleUpdateProperty}
        submitButtonText="Update Property"
      />
    </div>
  );
}
