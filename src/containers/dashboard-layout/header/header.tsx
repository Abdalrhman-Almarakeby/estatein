"use client";

import { Menu, X } from "lucide-react";
import { useDashboardSidebar } from "@/contexts/dashboard-sidebar";

export function Header() {
  const { isSidebarOpen, setIsSidebarOpen } = useDashboardSidebar();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-gray-darker py-4 shadow-2xl lg:hidden">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-purple-base">Estatein</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="rounded-md p-2"
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          {isSidebarOpen ? (
            <X className="size-8" />
          ) : (
            <Menu className="size-8" />
          )}
        </button>
      </div>
    </header>
  );
}
