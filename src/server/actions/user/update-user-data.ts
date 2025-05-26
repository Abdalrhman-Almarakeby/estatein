"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UserData, userSchema } from "@/lib/schemas";

export async function updateUserData(data: UserData) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { success: false, message: "Unauthorized" };
    }

    const { success } = userSchema.safeParse(data);

    if (!success) {
      return { success: false, message: "Invalid data" };
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    if (existingUser && existingUser.id !== user.id) {
      return {
        success: false,
        message:
          existingUser.email === data.email
            ? "User with this email already exists."
            : "Username is already taken, please choose a different one.",
      };
    }

    const admin = await prisma.user.findFirst({
      where: { role: "ADMIN" },
      select: {
        id: true,
        authorizedEmailAddresses: true,
      },
    });

    const isAdmin = admin?.id === user.id;
    const isAuthorized = admin?.authorizedEmailAddresses.includes(data.email);

    if (!isAdmin && !isAuthorized) {
      return {
        success: false,
        message: "You are not authorized to sign up with this email.",
      };
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data,
    });

    if (!updatedUser) {
      return { success: false, message: "Failed to update user data" };
    }

    revalidatePath("/dashboard/account");

    return { success: true, user: updatedUser, message: "User data updated" };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update user data",
    };
  }
}
