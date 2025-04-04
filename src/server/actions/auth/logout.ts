"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { removeUserFromSession } from "@/lib/auth";

export async function logOut() {
  await removeUserFromSession(cookies());
  redirect("/dashboard");
}
