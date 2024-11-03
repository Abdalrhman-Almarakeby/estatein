"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { UserIcon } from "lucide-react";
import { Captcha } from "@/components/form/captcha";
import { FieldError } from "@/components/form/field-error";
import { Input } from "@/components/form/input";
import { DashboardAuthLoading } from "@/containers/dashboard-auth-layout/dashboard-auth-loading";
import { useForgotPasswordForm } from "./use-forgot-password-form";

export function ForgotPasswordForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const {
    onSubmit,
    register,
    control,
    formState: { errors },
    captchaRef,
    isLoading,
  } = useForgotPasswordForm(callbackUrl ?? undefined);

  return (
    <>
      {isLoading ? (
        <DashboardAuthLoading />
      ) : (
        <>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Forgot Password</h1>
            <p className="text-primary text-base font-normal">
              Enter your email address to receive a password reset link
            </p>
            {errors.root?.message && (
              <FieldError>{errors.root?.message}</FieldError>
            )}
          </div>
          <form onSubmit={onSubmit} className="grid gap-6">
            <fieldset className="space-y-2">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <UserIcon
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 transform text-gray-medium"
                  size={18}
                />
                <Input
                  id="email"
                  className="pl-10"
                  placeholder="Email"
                  {...register("email")}
                />
              </div>
              {errors.email?.message && (
                <FieldError>{errors.email?.message}</FieldError>
              )}
            </fieldset>
            <Captcha
              control={control}
              captchaRef={captchaRef}
              error={errors.captchaToken?.message}
              size="compact"
            />
            <button
              type="submit"
              className="btn-sm btn-primary py-2 text-lg"
              disabled={isLoading}
            >
              Send Reset Link
            </button>
          </form>
          <p className="text-primary">
            Remember your password?{" "}
            <Link
              href={{
                pathname: "/dashboard/auth/login",
                query: callbackUrl ? { callbackUrl: callbackUrl } : undefined,
              }}
            >
              Back to login
            </Link>
          </p>
        </>
      )}
    </>
  );
}
