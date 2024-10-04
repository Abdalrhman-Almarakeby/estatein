import { Route } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import { useDashboardSidebar } from "@/contexts/dashboard-sidebar";

type SidebarItemProps = {
  href: Route;
  icon: ReactNode;
  label: string;
};

export function SidebarItem({ href, icon, label }: SidebarItemProps) {
  const { isSidebarOpen } = useDashboardSidebar();

  return (
    <Link
      tabIndex={isSidebarOpen ? 0 : -1}
      href={href}
      className="flex items-center gap-3 rounded-md p-2 text-gray-light !no-underline transition-colors"
    >
      {icon}
      {label}
    </Link>
  );
}
