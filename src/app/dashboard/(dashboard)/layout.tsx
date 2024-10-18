import { ReactNode } from "react";
import { Header } from "@/containers/dashboard-layout/header";
import { Sidebar } from "@/containers/dashboard-layout/sidebar";
import { DashboardSidebarContextProvider } from "@/contexts/dashboard-sidebar";

type LayoutProps = {
  children: ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-svh flex-col overflow-x-hidden bg-gray-darkest text-white contain-paint lg:flex-row">
      <DashboardSidebarContextProvider>
        <Header />
        <Sidebar />
        <main className="flex-1 overflow-auto pt-24 *:container lg:pt-8">
          {children}
        </main>
      </DashboardSidebarContextProvider>
    </div>
  );
}
