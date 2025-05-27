"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Plus, Shield, Trash2, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { FieldError } from "@/components/form/field-error";
import { Input } from "@/components/form/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Email, emailSchema } from "@/lib/schemas";
import { addVerifiedEmail, deleteVerifiedEmail } from "@/server/actions";

export type VerifiedEmail = {
  email: string;
  isUsed: boolean;
  usedBy?: string;
  isAdminEmail?: boolean;
};

type VerifiedEmailsProps = {
  emails: VerifiedEmail[];
};

export function VerifiedEmails({ emails }: VerifiedEmailsProps) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteEmailError, setDeleteEmailError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Email>({
    resolver: zodResolver(emailSchema),
  });

  async function onAddEmail(data: Email) {
    const { success, message } = await addVerifiedEmail(data);

    if (success) {
      setShowAddDialog(false);
      reset();
    } else {
      setError("root", { message });
    }
  }

  async function onDeleteEmail(email: string) {
    setIsDeleting(true);

    const { success, message } = await deleteVerifiedEmail({ email });

    if (success) {
      reset();
      setShowDeleteDialog(false);
      setDeleteEmailError(null);
    } else {
      setDeleteEmailError(message);
    }

    setIsDeleting(false);
  }

  const openAddDialog = () => {
    setShowAddDialog(true);
    reset();
  };

  const closeAddDialog = () => {
    setShowAddDialog(false);
    reset();
  };

  return (
    <div className="rounded-lg border border-gray-dark bg-gray-darker p-6 lg:p-8">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="bg-purple-base/20 flex h-10 w-10 items-center justify-center rounded-lg">
            <Mail className="h-5 w-5 text-purple-light" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white lg:text-xl">
              Verified Emails
            </h2>
            <p className="text-sm text-gray-light">
              {emails.length} verified emails
            </p>
          </div>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <button
              onClick={openAddDialog}
              className="btn-primary flex w-full items-center justify-center gap-2 px-4 py-2 sm:w-auto"
            >
              <Plus className="size-4" />
              Add Email
            </button>
          </DialogTrigger>
          <DialogContent className="border-gray-dark bg-gray-darker sm:max-w-md">
            <DialogHeader className="mb-10 space-y-3">
              <DialogTitle className="text-2xl">Add Verified Email</DialogTitle>
              <DialogDescription className="text-gray-light">
                Add a new email address to the verified list.
              </DialogDescription>
            </DialogHeader>

            {errors.root && <FieldError>{errors.root.message}</FieldError>}

            <form onSubmit={handleSubmit(onAddEmail)} className="space-y-4">
              <div>
                <Input placeholder="Email" {...register("email")} />
                {errors.email && (
                  <FieldError>{errors.email.message}</FieldError>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="btn-primary flex-1 px-4 py-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Email"}
                </button>
                <button
                  type="button"
                  className="btn-tertiary px-4 py-2"
                  onClick={closeAddDialog}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {errors.root && !showAddDialog && (
        <FieldError>{errors.root.message}</FieldError>
      )}

      <div className="space-y-3">
        {emails.map((email) => (
          <div
            key={email.email}
            className="rounded-lg border border-gray-medium bg-gray-dark p-4"
          >
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <p className="break-all font-medium text-white">
                    {email.email}
                  </p>
                  {email.isUsed && (
                    <div
                      className={cn(
                        "flex items-center gap-1 rounded px-2 py-1 text-xs",
                        email.isAdminEmail
                          ? "bg-yellow-500/20 text-yellow-300"
                          : "bg-blue-500/20 text-blue-300",
                      )}
                    >
                      {email.isAdminEmail ? (
                        <Shield className="size-4" />
                      ) : (
                        <User className="size-4" />
                      )}
                      {`${email.usedBy}${email.isAdminEmail && " (You)"}`}
                    </div>
                  )}
                </div>
              </div>

              <Dialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
              >
                <DialogTrigger asChild>
                  <button
                    disabled={email.isUsed}
                    className="rounded p-2 text-red-400 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </DialogTrigger>
                <DialogContent className="space-y-3 border-gray-dark bg-gray-darker sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">
                      Delete Verified Email
                    </DialogTitle>
                    <DialogDescription className="text-gray-light">
                      Are you sure you want to delete "{email.email}" from the
                      verified list? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>

                  {deleteEmailError && (
                    <FieldError>{deleteEmailError}</FieldError>
                  )}

                  <div className="flex gap-2 pt-4">
                    <button
                      onClick={() => onDeleteEmail(email.email)}
                      className="btn flex-1 bg-red-500 px-4 py-2"
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
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
            </div>
          </div>
        ))}

        {emails.length === 0 && (
          <div className="py-8 text-center text-gray-medium">
            <Mail className="mx-auto mb-3 size-12" />
            <p className="max-w-full text-gray-light">No verified emails yet</p>
            <p className="max-w-full text-sm">
              Add your first verified email to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
