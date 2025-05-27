"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function deleteUser(id: string) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
      return { success: false, message: "Unauthorized" };
    }

    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    if (!deletedUser) {
      return { success: false, message: "User not found" };
    }

    revalidatePath("/dashboard/admin");

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    return { success: false, message: "Failed to delete user" };
  }
}
