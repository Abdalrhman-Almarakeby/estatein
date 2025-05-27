"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Email, emailSchema } from "@/lib/schemas";

export async function addVerifiedEmail(data: Email) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
      return { success: false, message: "Unauthorized" };
    }

    const { success } = emailSchema.safeParse(data);

    if (!success) {
      return { success: false, message: "Invalid data." };
    }

    const existingEmail = await prisma.user.findFirst({
      where: {
        role: "ADMIN",
        id: user.id,
        authorizedEmailAddresses: {
          has: data.email,
        },
      },
    });

    if (existingEmail) {
      return { success: false, message: "Email already exists." };
    }

    await prisma.user.update({
      where: { role: "ADMIN", id: user.id },
      data: {
        authorizedEmailAddresses: {
          push: data.email,
        },
      },
    });

    revalidatePath("/dashboard/admin");

    return { success: true, message: "Email added successfully." };
  } catch (error) {
    return {
      success: false,
      message: "Couldn't add verified email, Please try again later.",
    };
  }
}
