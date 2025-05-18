"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PropertyData, propertyDataSchema } from "@/lib/schemas";

export async function updateProperty(id: string, data: PropertyData) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { success: false, message: "Unauthorized" };
    }

    const { success: isDataValid, error } = propertyDataSchema.safeParse(data);

    if (!isDataValid) {
      return { message: error.message, success: false };
    }

    const propertyExists = await prisma.property.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!propertyExists) {
      return {
        message: "Property does not exist.",
        success: false,
      };
    }

    const updatedProperty = await prisma.property.update({
      where: { id },
      data,
    });

    revalidatePath("/dashboard/properties");

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
