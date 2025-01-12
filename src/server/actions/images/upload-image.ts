"use server";

import { put } from "@vercel/blob";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function uploadImage(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { success: false, error: "Unauthorized" };
  }

  const file = formData.get("file") as File;

  if (!file) {
    return { success: false, error: "No file provided" };
  }

  const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

  if (!allowedTypes.has(file.type)) {
    return {
      success: false,
      error: "Invalid file type. Only JPEG, PNG, and WebP are allowed.",
    };
  }

  const MAX_SIZE = 5 * 1024 * 1024; // 5MB In Bytes

  if (file.size > MAX_SIZE) {
    return {
      success: false,
      error: "File size exceeds the maximum limit of 5MB.",
    };
  }

  try {
    const { url } = await put(file.name, file, {
      access: "public",
    });

    return { success: true, url };
  } catch (error) {
    return { success: false, error: "Failed to upload image" };
  }
}
