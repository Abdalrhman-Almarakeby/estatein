"use server";

import { PropertyData, propertyDataSchema } from "@/lib/schemas";
import {
  propertyExistsById,
  updateProperty as updatePropertyDb,
} from "@/server/db/properties";

export async function updateProperty(id: string, data: PropertyData) {
  const { success: isDataValid, error } = propertyDataSchema.safeParse(data);

  if (!isDataValid) {
    return { message: error.message, success: false };
  }

  try {
    const propertyExists = await propertyExistsById(id);

    if (!propertyExists) {
      return {
        message: "Property does not exist.",
        success: false,
      };
    }

    const updatedProperty = await updatePropertyDb(id, data);

    return {
      message: "Property was updated successfully.",
      success: true,
      data: updatedProperty,
    };
  } catch (error) {
    return {
      message: "Failed to update the property.",
      success: false,
    };
  }
}
