"use server";

import { del } from "@vercel/blob";
import { getCurrentUser } from "@/lib/get-current-user";

export async function deleteImage(url: string) {
  const user = await getCurrentUser();

  if (!user) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await del(url);

    return { success: true, message: "Image deleted" };
  } catch (error) {
    return { success: false, message: "Failed to delete image" };
  }
}
