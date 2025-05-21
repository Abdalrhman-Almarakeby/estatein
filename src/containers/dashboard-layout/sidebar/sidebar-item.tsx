import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { useDashboardSidebar } from "@/contexts/dashboard-sidebar";
import { useWindowWidth } from "@/hooks";
import { cn } from "@/lib/utils";

type SidebarItemProps = {
  href: Route;
  icon: ReactNode;
  label: string;
};

export function SidebarItem({ href, icon, label }: SidebarItemProps) {
  const { isSidebarOpen, setIsSidebarOpen } = useDashboardSidebar();
  const pathname = usePathname();
  const width = useWindowWidth();
  const isActive =
    pathname === "/dashboard"
      ? pathname === href
      : pathname.startsWith(href) && href !== "/dashboard";

  return (
    <Link
      tabIndex={!isSidebarOpen && width && width < 1024 ? -1 : 1}
      href={href}
      onClick={() => setIsSidebarOpen(false)}
      className={cn(
        "flex items-center gap-3 rounded-md border-l-2 border-transparent p-2 text-gray-light !no-underline transition-colors",
        isActive && "border-purple-base bg-gray-dark text-purple-base",
      )}
    >
      {icon}
      {label}
    </Link>
  );
}
