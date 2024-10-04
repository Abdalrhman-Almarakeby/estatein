import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { Header } from "@/containers/dashboard-layout/header";
import { Sidebar } from "@/containers/dashboard-layout/sidebar";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardSidebarContextProvider } from "@/contexts/dashboard-sidebar";
import "@/styles/global.css";

type LayoutProps = {
  children: ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user?.email) {
    redirect("/dashboard/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="flex min-h-svh flex-col overflow-x-hidden bg-gray-darkest text-white contain-paint lg:flex-row">
      <DashboardSidebarContextProvider>
        <Header />
        <Sidebar isAdmin={isAdmin} />
        <main className="flex-1 overflow-auto pt-24 *:container lg:pt-8">
          {children}
        </main>
      </DashboardSidebarContextProvider>
    </div>
  );
}
