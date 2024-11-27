"ues server";

import { del } from "@vercel/blob";

export async function deleteImage(url: string) {
  try {
    await del(url);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete image" };
  }
}
