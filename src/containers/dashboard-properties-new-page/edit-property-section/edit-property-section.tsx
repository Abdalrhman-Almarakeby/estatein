"use client";

import { useRouter } from "next/navigation";
import { PropertyForm } from "@/containers/dashboard-properties-new-page/property-form/property-form";
import { PropertyData } from "@/lib/schemas";
import { updateProperty } from "@/server/actions";

type EditPropertySectionProps = {
  propertyId: string;
  propertyData: PropertyData;
};

export function EditPropertySection({
  propertyId,
  propertyData,
}: EditPropertySectionProps) {
  const router = useRouter();

  async function handleUpdateProperty(data: PropertyData) {
    const {
      success,
      data: updatedProperty,
      message,
    } = await updateProperty(propertyId, data);

    if (!success || !updatedProperty) {
      throw new Error(message || "Failed to update property");
    }

    router.push("/dashboard/properties");
  }
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-3xl font-bold">Edit Property</h1>
      <PropertyForm
        initialData={propertyData}
        onSubmit={handleUpdateProperty}
        submitButtonText="Update Property"
      />
    </div>
  );
}
