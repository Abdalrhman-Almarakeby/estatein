"use server";

import { put } from "@vercel/blob";
import { getCurrentUser } from "@/lib/get-current-user";

export async function uploadImage(formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    return { success: false, message: "Unauthorized" };
  }

  const file = formData.get("file") as File | null;

  if (!file) {
    return { success: false, message: "No file provided" };
  }

  const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

  if (!allowedTypes.has(file.type)) {
    return {
      success: false,
      message: "Invalid file type. Only JPEG, PNG, and WebP are allowed.",
    };
  }

  const MAX_SIZE = 5 * 1024 * 1024; // 5MB In Bytes

  if (file.size > MAX_SIZE) {
    return {
      success: false,
      message: "File size exceeds the maximum limit of 5MB.",
    };
  }

  try {
    const { url } = await put(file.name, file, {
      access: "public",
    });

    return { success: true, url, message: "Image uploaded" };
  } catch (error) {
    return { success: false, message: "Failed to upload image" };
  }
}
