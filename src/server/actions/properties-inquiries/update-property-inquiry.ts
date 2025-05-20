"use server";

import { revalidatePath } from "next/cache";
import { PropertyInquiry } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function updatePropertyInquiry(
  id: string,
  data: Partial<PropertyInquiry>,
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { success: false, message: "Unauthorized" };
    }

    const inquiryExists = await prisma.propertyInquiry.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!inquiryExists) {
      return {
        message: "Inquiry does not exist.",
        success: false,
      };
    }

    const updatedInquiry = await prisma.propertyInquiry.update({
      where: { id },
      data: {
        ...data,
        bathrooms: data.bathrooms ? +data.bathrooms : undefined,
        bedrooms: data.bedrooms ? +data.bedrooms : undefined,
      },
    });

    revalidatePath("/dashboard/inquiries");

    return {
      message: "Inquiry was updated successfully.",
      success: true,
      data: updatedInquiry,
    };
  } catch (error) {
    return {
      message: "Failed to update the inquiry.",
      success: false,
    };
  }
}
