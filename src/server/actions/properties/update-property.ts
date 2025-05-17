"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { PropertyData, propertyDataSchema } from "@/lib/schemas";

export async function updateProperty(id: string, data: PropertyData) {
  const { success: isDataValid, error } = propertyDataSchema.safeParse(data);

  if (!isDataValid) {
    return { message: error.message, success: false };
  }

  try {
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
