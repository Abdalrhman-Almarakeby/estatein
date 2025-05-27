"use client";

import { format } from "date-fns";
import { Clock, Settings } from "lucide-react";
import { FieldError } from "@/components/form/field-error";
import { PasswordInput } from "@/components/form/password-input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useChangePassword } from "./use-change-password";

type SecuritySettingsProps = {
  createdAt: Date;
  updatedAt: Date;
};

export function SecuritySettings(userData: SecuritySettingsProps) {
  const {
    errors,
    isSubmitting,
    onSubmit,
    register,
    showPasswordDialog,
    setShowPasswordDialog,
    reset,
  } = useChangePassword();

  return (
    <div className="rounded-lg border border-gray-dark bg-gray-darker p-6 lg:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-purple-light">
          <Settings className="size-8 text-purple-base" />
        </div>
        <h2 className="text-lg font-semibold text-white lg:text-xl">
          Security Settings
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <Dialog
            open={showPasswordDialog}
            onOpenChange={(change) => {
              if (!change) {
                reset();
              }
              setShowPasswordDialog(change);
            }}
          >
            <DialogTrigger asChild>
              <button className="btn-sm btn-primary py-2 text-base">
                Change Password
              </button>
            </DialogTrigger>
            <DialogContent className="border-gray-dark bg-gray-darker sm:max-w-md">
              <DialogHeader className="mb-10 space-y-3">
                <DialogTitle className="text-2xl">Change Password</DialogTitle>
                <DialogDescription className="text-gray-light">
                  Enter your current password and choose a new secure password.
                </DialogDescription>
              </DialogHeader>

              {errors.root && <FieldError>{errors.root.message}</FieldError>}

              <form onSubmit={onSubmit} className="space-y-4">
                <PasswordInput
                  placeholder="Current Password"
                  {...register("currentPassword")}
                />
                {errors.currentPassword && (
                  <FieldError>{errors.currentPassword.message}</FieldError>
                )}

                <PasswordInput
                  placeholder="New Password"
                  {...register("newPassword")}
                />
                {errors.newPassword && (
                  <FieldError>{errors.newPassword.message}</FieldError>
                )}

                <PasswordInput
                  placeholder="Confirm New Password"
                  {...register("confirmNewPassword")}
                />
                {errors.confirmNewPassword && (
                  <FieldError>{errors.confirmNewPassword.message}</FieldError>
                )}

                <div className="flex gap-2 pt-4">
                  <button
                    className="btn-sm btn-primary flex-1 py-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Changing..." : "Change Password"}
                  </button>
                  <button
                    className="btn-sm btn-secondary py-2"
                    onClick={() => {
                      setShowPasswordDialog(false);
                      reset();
                    }}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-5 border-t border-gray-dark pt-4">
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-gray-light" />
            <span className="font-medium text-gray-light">
              Account Timeline
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <span className="text-gray-light">Created at:</span>
              <span className="font-medium text-white">
                {format(userData.createdAt, "PPpp")}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-light">Updated at:</span>
              <span className="font-medium text-white">
                {format(userData.updatedAt, "PPpp")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
