"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
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
    <div className="container mx-auto space-y-10 py-10">
      <Link
        href="/dashboard/properties"
        className="btn btn-primary flex w-fit items-center gap-3 rounded-md px-2.5 py-1.5"
      >
        <ArrowLeft className="size-5" />
        Back to Properties
      </Link>
      <h1 className="mb-8 text-3xl font-bold">Add New Property</h1>
      <PropertyForm
        onSubmit={handleSubmit}
        submitButtonText="Create Property"
      />
    </div>
  );
}
