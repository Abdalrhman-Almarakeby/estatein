"use client";

import { Edit, Save, User as UserIcon, X } from "lucide-react";
import { FieldError } from "@/components/form/field-error";
import { Input } from "@/components/form/input";
import { useAccountInformation } from "./use-account-information";

type AccountInformationProps = {
  email: string;
  username: string;
};

export function AccountInformation({
  email,
  username,
}: AccountInformationProps) {
  const {
    isEditing,
    setIsEditing,
    onSubmit,
    register,
    isSubmitting,
    errors,
    handleCancel,
  } = useAccountInformation({
    email,
    username,
  });

  return (
    <div className="rounded-lg border border-gray-dark bg-gray-darker p-6 lg:p-8">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-purple-light">
            <UserIcon className="size-8 text-purple-base" />
          </div>
          <h2 className="text-lg font-semibold text-white lg:text-xl">
            Account Information
          </h2>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="btn-sm btn-primary flex w-fit items-center gap-2 px-2.5 py-1.5 text-sm"
          >
            <Edit className="size-4" />
            Edit
          </button>
        ) : (
          <div className="flex w-full flex-row gap-2 sm:w-auto">
            <button
              onClick={() => onSubmit()}
              disabled={isSubmitting}
              className="btn btn-primary flex items-center gap-2 px-2.5 py-1.5 text-sm"
            >
              <Save className="size-4" />
              {isSubmitting ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              disabled={isSubmitting}
              className="btn btn-secondary flex items-center gap-2 px-2.5 py-1.5 text-sm"
            >
              <X className="size-4" />
              Cancel
            </button>
          </div>
        )}
      </div>

      {errors.root && <FieldError>{errors.root.message}</FieldError>}

      {!isEditing ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-light">
              Username
            </label>
            <p className="break-all text-lg font-medium text-white">
              {username}
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-light">
              Email Address
            </label>
            <p className="break-all text-lg font-medium text-white">{email}</p>
          </div>
        </div>
      ) : (
        <form className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-white"
              >
                Username
              </label>
              <Input
                id="username"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <FieldError>{errors.username.message}</FieldError>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-white">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
