import Link from "next/link";
import { Shield } from "lucide-react";
import { AccountInformation } from "@/containers/dashboard-account-page/account-information";
import { SecuritySettings } from "@/containers/dashboard-account-page/security-settings";
import { getCurrentUser } from "@/lib/auth";

export default async function Page() {
  const user = await getCurrentUser({
    withFullUser: true,
    redirectIfNotFound: true,
  });

  return (
    <div className="container min-h-screen py-12">
      <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold">Account Settings</h1>
        {user.role === "ADMIN" && (
          <Link
            href="/dashboard/admin"
            className="btn-sm btn-primary flex items-center gap-3 rounded-md px-4 py-2 text-base font-medium"
          >
            <Shield className="stroke-3 size-5" />
            Admin Page
          </Link>
        )}
      </div>
      <div className="space-y-6">
        <AccountInformation email={user.email} username={user.username} />
        <SecuritySettings
          createdAt={user.createdAt}
          updatedAt={user.updatedAt}
        />
      </div>
    </div>
  );
}
