"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Email, emailSchema } from "@/lib/schemas";

export async function deleteVerifiedEmail(data: Email) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
      return { success: false, message: "Unauthorized" };
    }

    const { success } = emailSchema.safeParse(data);

    if (!success) {
      return { success: false, message: "Invalid data." };
    }

    const admin = await prisma.user.findFirst({
      where: { role: "ADMIN", id: user.id },
    });

    const emails = admin?.authorizedEmailAddresses || [];
    const filteredEmails = emails.filter((email) => email !== data.email);

    await prisma.user.update({
      where: { role: "ADMIN", id: user.id },
      data: {
        authorizedEmailAddresses: filteredEmails,
      },
    });

    revalidatePath("/dashboard/admin");

    return { success: true, message: "Email deleted successfully." };
  } catch (error) {
    return {
      success: false,
      message: "Couldn't delete verified email, Please try again later.",
    };
  }
}
