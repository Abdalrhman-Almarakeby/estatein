"use server";

import { del } from "@vercel/blob";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function deleteImage(url: string) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await del(url);

    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete image" };
  }
}
