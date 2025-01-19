"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LockIcon } from "lucide-react";
import { Captcha } from "@/components/form/captcha";
import { FieldError } from "@/components/form/field-error";
import { PasswordInput } from "@/components/form/password-input";
import { DashboardAuthLoading } from "@/containers/dashboard-auth-layout/dashboard-auth-loading";
import { usePasswordResetForm } from "./use-password-reset-form";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const callbackUrl = searchParams.get("callbackUrl");

  const {
    onSubmit,
    register,
    control,
    formState: { errors },
    captchaRef,
    isLoading,
    isExpired,
    capsLock,
  } = usePasswordResetForm(token ?? undefined, callbackUrl ?? undefined);

  return (
    <>
      {isLoading ? (
        <DashboardAuthLoading />
      ) : (
        <>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Reset Password</h1>
            <p className="text-primary text-base font-normal">
              Enter your new password to reset your account
            </p>
            {errors.root?.message && !isExpired && (
              <FieldError>{errors.root?.message}</FieldError>
            )}
            {isExpired && (
              <FieldError>
                Reset link expired. Please request a new one from{" "}
                <Link href="/dashboard/auth/forgot-password">here</Link>.
              </FieldError>
            )}
            <div className="h-6">
              {capsLock && (
                <p
                  role="alert"
                  aria-live="polite"
                  aria-atomic="true"
                  className="text-sm bold"
                >
                  CAPS LOCK is on
                </p>
              )}
            </div>
          </div>
          <form onSubmit={onSubmit} className="grid gap-6">
            <fieldset className="space-y-2">
              <label htmlFor="password" className="sr-only">
                New Password
              </label>
              <PasswordInput
                id="password"
                className="pl-10"
                placeholder="New Password"
                {...register("password")}
              />
              {errors.password?.message && (
                <FieldError>{errors.password?.message}</FieldError>
              )}
            </fieldset>
            <fieldset className="space-y-2">
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm New Password
              </label>
              <div className="relative">
                <LockIcon
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 transform text-gray-medium"
                  size={18}
                />
                <PasswordInput
                  id="confirmPassword"
                  className="pl-10"
                  placeholder="Confirm New Password"
                  {...register("confirmPassword")}
                />
              </div>
              {errors.confirmPassword?.message && (
                <FieldError>{errors.confirmPassword?.message}</FieldError>
              )}
            </fieldset>
            <Captcha
              control={control}
              captchaRef={captchaRef}
              error={errors.captchaToken?.message}
              size="normal"
            />

            <button
              type="submit"
              className="btn-sm btn-primary py-2 text-lg"
              disabled={isLoading}
            >
              Reset Password
            </button>
          </form>
          <p className="text-primary">
            Remember your password?{" "}
            <Link href="/dashboard/auth/login">Back to login</Link>
          </p>
        </>
      )}
    </>
  );
}
