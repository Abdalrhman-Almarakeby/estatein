"use client";

import Link from "next/link";
import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToastNotification } from "@/hooks";
import { getBaseUrl } from "@/lib/utils";
import { deleteProperty } from "@/server/actions/delete-property";

type ActionsMenuProps = {
  propertyId: string;
  propertyName: string;
};

export function ActionsMenu({ propertyId, propertyName }: ActionsMenuProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toastNotification = useToastNotification({
    loadingMessage: "Deleting property...",
    successMessage: "Property deleted successfully",
    errorMessage: "An error occurred. Please try again later.",
  });

  const handleDelete = async () => {
    toastNotification.showLoading();
    const { success } = await deleteProperty(propertyId);

    if (success) {
      toastNotification.showSuccess();
    } else {
      toastNotification.showError();
    }
    setIsDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <button className="grid h-8 w-8 place-items-center rounded-full p-0 hover:bg-gray-darkest">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="[&_*]:!no-underline">
          <DropdownMenuItem asChild>
            <Link href={`/properties/${propertyId}`}>View Property Page</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(propertyId)}
          >
            Copy property ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              navigator.clipboard.writeText(
                `${getBaseUrl()}/properties/${propertyId}`,
              )
            }
          >
            Copy property Page Link
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/properties/${propertyId}/edit`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              setIsDropdownOpen(false);
              setIsDialogOpen(true);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="space-y-6 border bg-gray-darkest sm:max-w-[425px]">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl">Confirm Delete</DialogTitle>
            <DialogDescription className="font-normal">
              Are you sure you want to delete "{propertyName}"? This action is
              irreversible and the property data will be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="justify-center sm:justify-start">
            <button
              onClick={() => setIsDialogOpen(false)}
              className="btn-tertiary btn-sm mr-2 rounded py-2"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="btn-sm rounded bg-red-500 py-2 text-white"
            >
              Delete
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
