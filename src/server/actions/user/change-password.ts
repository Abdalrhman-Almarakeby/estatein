"use server";

import { comparePasswords, getCurrentUser, hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ChangePassword, changePasswordSchema } from "@/lib/schemas";

export async function changePassword(data: ChangePassword) {
  try {
    const user = await getCurrentUser({ withFullUser: true });

    if (!user) {
      return { success: false, message: "Unauthorized" };
    }

    const { success } = changePasswordSchema.safeParse(data);

    if (!success) {
      return { success: false, message: "Invalid data" };
    }

    const isValidPassword = await comparePasswords({
      password: data.currentPassword,
      salt: user.salt,
      hashedPassword: user.password,
    });

    if (!isValidPassword) {
      return { success: false, message: "Current password is incorrect." };
    }

    if (data.newPassword === data.currentPassword) {
      return {
        success: false,
        message: "New password cannot be the same as the current password.",
      };
    }

    const newPasswordHash = await hashPassword(data.newPassword, user.salt);
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { password: newPasswordHash },
    });

    if (!updatedUser) {
      return {
        success: false,
        message: "Failed to change password. Please try again later.",
      };
    }

    return {
      success: true,
      message: "Password changed successfully.",
      user: updatedUser,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to change password. Please try again later.",
    };
  }
}
