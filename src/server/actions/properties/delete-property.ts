"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function deleteProperty(id: string) {
  try {
    const property = await prisma.property.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!property) {
      return { success: false, message: "Property not found" };
    }

    const deletedProperty = await prisma.property.delete({
      where: { id },
    });

    revalidatePath("/dashboard/properties");

    return { success: true, property: deletedProperty };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
}
