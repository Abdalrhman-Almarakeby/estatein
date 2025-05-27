"use client";

import { useState } from "react";
import { User as PrismaUser } from "@prisma/client";
import { format } from "date-fns";
import {
  Calendar,
  Lock,
  Mail,
  Shield,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { FieldError } from "@/components/form/field-error";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteUser } from "@/server/actions";

type User = Pick<
  PrismaUser,
  "id" | "username" | "email" | "role" | "createdAt" | "updatedAt"
>;

type UsersManagementProps = {
  users: User[];
};

export function UsersManagement({ users }: UsersManagementProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function onDeleteUser(id: string) {
    setIsDeleting(true);
    const { success, message } = await deleteUser(id);

    if (success) {
      setShowDeleteDialog(false);
    } else {
      setDeleteError(message);
    }

    setIsDeleting(false);
  }

  return (
    <div className="rounded-lg border border-gray-dark bg-gray-darker p-6 lg:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="bg-purple-base/20 flex h-10 w-10 items-center justify-center rounded-lg">
          <Users className="h-5 w-5 text-purple-light" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white lg:text-xl">
            Users Management
          </h2>
          <p className="text-sm text-gray-light">{users.length} total users</p>
        </div>
      </div>

      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="rounded-lg border border-gray-medium bg-gray-dark p-4"
          >
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div className="flex-1 space-y-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <div className="flex items-center gap-2">
                    <User className="size-4 text-gray-light" />
                    <span className="font-medium text-white">
                      {user.username}
                    </span>
                    {user.role === "ADMIN" && (
                      <div className="flex items-center gap-1 rounded bg-yellow-500/20 px-2 py-1 text-xs text-yellow-300">
                        <Shield className="size-4" />
                        Admin (You)
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="size-4 text-gray-light" />
                  <span className="break-all text-sm text-gray-light">
                    {user.email}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2 text-xs text-gray-light sm:grid-cols-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    <span>Created: {format(user.createdAt, "PPp")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    <span>Updated: {format(user.updatedAt, "PPp")}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                {user.role === "ADMIN" ? (
                  <div className="flex items-center gap-2 rounded-lg px-3 py-2">
                    <Lock className="size-4 text-gray-light" />
                    <span className="text-sm text-gray-light">
                      Cannot delete admin account
                    </span>
                  </div>
                ) : (
                  <Dialog
                    open={showDeleteDialog}
                    onOpenChange={setShowDeleteDialog}
                  >
                    <DialogTrigger asChild>
                      <button
                        onClick={() => setShowDeleteDialog(true)}
                        className="rounded p-2 text-red-400 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Trash2 className="mr-2 size-4" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="border-gray-dark bg-gray-darker sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-white">
                          Delete User
                        </DialogTitle>
                        <DialogDescription className="text-gray-light">
                          Are you sure you want to delete user "{user.username}
                          "? This action cannot be undone and will permanently
                          remove all user data.
                        </DialogDescription>
                      </DialogHeader>

                      {deleteError && <FieldError>{deleteError}</FieldError>}

                      <div className="flex gap-2 pt-4">
                        <button
                          onClick={() => onDeleteUser(user.id)}
                          className="btn flex-1 bg-red-500 px-4 py-2"
                          disabled={isDeleting}
                        >
                          {isDeleting ? "Deleting User..." : "Delete User"}
                        </button>
                        <button
                          onClick={() => setShowDeleteDialog(false)}
                          className="btn-tertiary px-4 py-2"
                          disabled={isDeleting}
                        >
                          Cancel
                        </button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>
        ))}

        {users.length === 0 && (
          <div className="py-8 text-center">
            <Users className="mx-auto mb-3 h-12 w-12 text-gray-medium" />
            <p className="text-gray-light">No users found</p>
            <p className="text-sm text-gray-medium">
              Users will appear here when they join the platform
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
