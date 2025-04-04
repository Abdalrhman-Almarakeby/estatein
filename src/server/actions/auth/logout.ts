"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { deleteUserSession } from "@/lib/auth";

export async function logOut() {
  await deleteUserSession(cookies());
  redirect("/dashboard");
}
