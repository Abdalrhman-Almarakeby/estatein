"use client";

import { FileText, Home, Mail, Users } from "lucide-react";
import { useDashboardSidebar } from "@/contexts/dashboard-sidebar";
import { cn } from "@/lib/utils";
import { LogoutButton } from "./logout-button";
import { SidebarItem } from "./sidebar-item";

export function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen } = useDashboardSidebar();

  return (
    <>
      <nav
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 transform overflow-y-auto bg-gray-darker transition duration-200 ease-in-out lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex min-h-svh flex-col gap-8 p-6 hover:text-white">
          <h1 className="hidden items-center ps-2 text-2xl font-bold text-purple-base lg:flex">
            Estatein
          </h1>
          <nav className="mt-16 space-y-4 lg:mt-0">
            <SidebarItem
              href="/dashboard"
              icon={<Home className="size-5" />}
              label="Dashboard"
            />
            <SidebarItem
              href="/dashboard/properties"
              icon={<FileText className="size-5" />}
              label="Properties"
            />
            <SidebarItem
              href="/dashboard/inquiries"
              icon={<Mail className="size-5" />}
              label="Inquiries"
            />
            <SidebarItem
              href="/dashboard/newsletters"
              icon={<Users className="size-5" />}
              label="Newsletters"
            />
          </nav>
          <div className="mt-auto grid gap-4">
            <SidebarItem
              href="/dashboard/account"
              icon={<Users className="size-5" />}
              label="Account"
            />
            <LogoutButton />
          </div>
        </div>
      </nav>
      <div
        className={cn(
          "fixed inset-0 z-30 bg-opacity-50 transition-all lg:hidden",
          isSidebarOpen && "bg-black",
        )}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      ></div>
    </>
  );
}
