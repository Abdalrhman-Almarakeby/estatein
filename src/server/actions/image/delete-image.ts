"use server";

import { del } from "@vercel/blob";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function deleteImage(url: string) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await del(url);

    return { success: true, message: "Image deleted" };
  } catch (error) {
    return { success: false, message: "Failed to delete image" };
  }
}
