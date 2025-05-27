import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { UsersManagement } from "@/containers/dashboard-admin-page/users-management";
import { VerifiedEmails } from "@/containers/dashboard-admin-page/verified-email";
import { prisma } from "@/lib/prisma";

export default async function Page() {
  const [emails, users] = await Promise.all([
    (async () => {
      const admin = await prisma.user.findFirst({
        where: { role: "ADMIN" },
        select: { authorizedEmailAddresses: true, email: true },
      });

      const verifiedEmails = [...(admin?.authorizedEmailAddresses ?? [])];

      if (admin?.email) {
        verifiedEmails.push(admin.email);
      }

      if (verifiedEmails.length === 0) return [];

      verifiedEmails.reverse();

      const usersUsingVerifiedEmails = await prisma.user.findMany({
        where: {
          email: { in: verifiedEmails },
        },
        select: {
          email: true,
          username: true,
        },
      });

      const usageMap = new Map(
        usersUsingVerifiedEmails.map((u) => [u.email, u.username]),
      );

      return verifiedEmails.map((email) => ({
        email,
        isUsed: usageMap.has(email),
        usedBy: usageMap.get(email),
        isAdminEmail: email === admin?.email,
      }));
    })(),
    prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  return (
    <div className="container min-h-screen py-12">
      <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold">Admin Page</h1>
        <Link
          href="/dashboard/account"
          className="btn-sm btn-secondary flex items-center gap-2 px-4 py-2 text-base !no-underline"
        >
          <ArrowLeft className="size-4" />
          Back to Account
        </Link>
      </div>

      <div className="space-y-8">
        <VerifiedEmails emails={emails} />
        <UsersManagement users={users} />
      </div>
    </div>
  );
}
