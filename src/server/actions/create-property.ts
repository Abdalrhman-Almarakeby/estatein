"use server";

import { CreateProperty, createPropertySchema } from "@/lib/schemas";
import {
  createProperty as createPropertyDb,
  propertyExistsByName,
} from "@/server/db/properties";

export async function createProperty(data: CreateProperty) {
  const { success: isDataValid, error } = createPropertySchema.safeParse(data);

  if (!isDataValid) {
    return { message: error.message, success: false };
  }

  try {
    const propertyWithSameName = await propertyExistsByName(data.title);

    if (propertyWithSameName) {
      return {
        message: "Property with the same name already exists.",
        success: false,
      };
    }

    const property = await createPropertyDb(data);

    return {
      message: "Property was created successfully.",
      success: true,
      data: property,
    };
  } catch (error) {
    return {
      message: "Failed to create the property ",
      success: false,
    };
  }
}
