"ues server";

import { put } from "@vercel/blob";

export async function uploadImage(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No file provided");
  }

  try {
    const { url } = await put(file.name, file, { access: "public" });

    return { success: true, url };
  } catch (error) {
    return { success: false, error: "Failed to upload image" };
  }
}
