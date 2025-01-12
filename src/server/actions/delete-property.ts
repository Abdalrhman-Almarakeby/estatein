"use server";

import { revalidatePath } from "next/cache";
import {
  deleteProperty as deletePropertyDb,
  propertyExistsById,
} from "@/server/db/properties";

export async function deleteProperty(id: string) {
  try {
    const property = await propertyExistsById(id);

    if (!property) {
      return { success: false, message: "Property not found" };
    }

    const deletedProperty = await deletePropertyDb(id);
    revalidatePath("/dashboard/properties");

    return { success: true, property: deletedProperty };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
}
