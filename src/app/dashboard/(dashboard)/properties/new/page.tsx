"use client";

import { useState } from "react";
import { PropertyCreatedSuccess } from "@/containers/dashboard-properties-new-page/property-form";
import { PropertyForm } from "@/containers/dashboard-properties-new-page/property-form/property-form";
import { PropertyData } from "@/lib/schemas";
import { createProperty } from "@/server/actions/create-property";

export default function Page() {
  const [createdProperty, setCreatedProperty] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleSubmit = async (data: PropertyData) => {
    const { success, data: property, message } = await createProperty(data);

    if (!success || !property) {
      throw new Error(message || "Failed to create property");
    }

    setCreatedProperty({ id: property.id, name: property.title });
  };

  return createdProperty ? (
    <PropertyCreatedSuccess
      propertyId={createdProperty.id}
      propertyTitle={createdProperty.name}
      onCreateNewProperty={() => setCreatedProperty(null)}
    />
  ) : (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Add New Property</h1>
      <PropertyForm
        onSubmit={handleSubmit}
        submitButtonText="Create Property"
      />
    </div>
  );
}
