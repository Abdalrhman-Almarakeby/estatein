"use server";

import { revalidatePath } from "next/cache";
import { SpecificPropertyInquiry } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function updateSpecificPropertyInquiry(
  id: string,
  data: Partial<SpecificPropertyInquiry>,
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { success: false, message: "Unauthorized" };
    }

    const inquiryExists = await prisma.specificPropertyInquiry.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!inquiryExists) {
      return {
        message: "Inquiry does not exist.",
        success: false,
      };
    }

    const updatedInquiry = await prisma.specificPropertyInquiry.update({
      where: { id },
      data,
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
