import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Header } from "@/containers/dashboard-layout/header";
import { Sidebar } from "@/containers/dashboard-layout/sidebar";
import { DashboardSidebarContextProvider } from "@/contexts/dashboard-sidebar";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative flex min-h-svh flex-col overflow-x-hidden bg-gray-darkest text-white lg:flex-row">
      <Toaster
        toastOptions={{ className: "toast" }}
        containerClassName="fixed bottom-5 left-5 right-5 top-5"
      />
      <DashboardSidebarContextProvider>
        <Header />
        <Sidebar />
        <main className="flex-1 overflow-auto pt-24 *:container lg:ml-64 lg:pt-8">
          {children}
        </main>
      </DashboardSidebarContextProvider>
    </div>
  );
}
