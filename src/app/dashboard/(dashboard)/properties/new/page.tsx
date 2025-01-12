"use client";

import { useState } from "react";
import {
  CreatePropertyForm,
  PropertyCreatedSuccess,
} from "@/containers/dashboard-properties-new-page/create-property-form";

export default function Page() {
  const [createdProperty, setCreatedProperty] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handlePropertyCreated = (property: { id: string; name: string }) => {
    setCreatedProperty(property);
  };

  return createdProperty ? (
    <PropertyCreatedSuccess
      propertyId={createdProperty.id}
      propertyTitle={createdProperty.name}
      onCreateNewProperty={() => setCreatedProperty(null)}
    />
  ) : (
    <CreatePropertyForm onPropertyCreated={handlePropertyCreated} />
  );
}
