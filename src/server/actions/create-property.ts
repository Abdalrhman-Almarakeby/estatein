"use server";

import { prisma } from "@/lib/prisma";
import { PropertyData, propertyDataSchema } from "@/lib/schemas";

export async function createProperty(data: PropertyData) {
  const { success: isDataValid, error } = propertyDataSchema.safeParse(data);

  if (!isDataValid) {
    return { message: error.message, success: false };
  }

  try {
    const propertyWithSameTitle = await prisma.property.findUnique({
      where: { title: data.title },
      select: { title: true },
    });

    if (propertyWithSameTitle) {
      return {
        message: "Property with the same name already exists.",
        success: false,
      };
    }

    const property = await prisma.property.create({
      data,
    });

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
