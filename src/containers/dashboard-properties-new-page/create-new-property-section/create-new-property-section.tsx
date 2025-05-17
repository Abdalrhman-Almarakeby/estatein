"use client";

import { useState } from "react";
import { PropertyCreatedSuccess } from "@/containers/dashboard-properties-new-page/property-form";
import { PropertyForm } from "@/containers/dashboard-properties-new-page/property-form/property-form";
import { PropertyData } from "@/lib/schemas";
import { createProperty } from "@/server/actions";

export function CreateNewPropertySection() {
  const [createdProperty, setCreatedProperty] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const handleSubmit = async (data: PropertyData) => {
    const { success, data: property, message } = await createProperty(data);

    if (!success || !property) {
      throw new Error(message || "Failed to create property");
    }

    setCreatedProperty({ id: property.id, title: property.title });
  };

  return createdProperty ? (
    <PropertyCreatedSuccess
      propertyId={createdProperty.id}
      propertyTitle={createdProperty.title}
      onCreateNewProperty={() => setCreatedProperty(null)}
    />
  ) : (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-3xl font-bold">Add New Property</h1>
      <PropertyForm
        onSubmit={handleSubmit}
        submitButtonText="Create Property"
      />
    </div>
  );
}
