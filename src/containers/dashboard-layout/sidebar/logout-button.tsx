"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDashboardSidebar } from "@/contexts/dashboard-sidebar";
import { useWindowWidth } from "@/hooks";
import { logOut } from "@/server/actions";

export function LogoutButton() {
  const [open, setOpen] = useState(false);
  const { isSidebarOpen } = useDashboardSidebar();
  const width = useWindowWidth();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          tabIndex={!isSidebarOpen && width && width < 1024 ? -1 : 1}
          className="mt-auto flex items-center gap-3 rounded-md p-2 text-gray-light"
        >
          <LogOut className="size-5" />
          Logout
        </button>
      </DialogTrigger>
      <DialogContent className="space-y-6 border bg-gray-darkest sm:max-w-[425px]">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl">Confirm Logout</DialogTitle>
          <DialogDescription className="font-normal">
            Are you sure you want to logout? You'll need to log in again to
            access your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-center sm:justify-start">
          <button
            onClick={() => setOpen(false)}
            className="btn-tertiary btn-sm mr-2 rounded py-2"
          >
            Cancel
          </button>
          <button
            onClick={async () => await logOut()}
            className="btn-sm rounded bg-red-500 py-2 text-white"
          >
            Logout
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
