"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { UserIcon } from "lucide-react";
import { FieldError } from "@/components/form/field-error";
import { Input } from "@/components/form/input";
import { PasswordInput } from "@/components/form/password-input";
import { DashboardAuthLoading } from "@/containers/dashboard-auth-layout/dashboard-auth-loading";
import { useSignupForm } from "./use-signup-form";

export function SignupForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const {
    onSubmit,
    formState: { errors },
    register,
    isLoading,
    capsLock,
  } = useSignupForm(callbackUrl ?? undefined);

  return (
    <>
      {isLoading ? (
        <DashboardAuthLoading />
      ) : (
        <>
          <fieldset className="space-y-2">
            <h1 className="text-2xl font-bold">Create Dashboard Account</h1>
            <p className="text-primary text-base font-normal">
              Sign up for access to the dashboard
            </p>
            {errors.root?.message && (
              <FieldError>{errors.root?.message}</FieldError>
            )}
            <div className="h-6">
              {capsLock && (
                <p
                  role="alert"
                  aria-live="polite"
                  aria-atomic="true"
                  className="text-sm font-medium"
                >
                  CAPS LOCK is on
                </p>
              )}
            </div>
          </fieldset>
          <form onSubmit={onSubmit} className="grid gap-6">
            <fieldset className="space-y-2">
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <div className="relative">
                <UserIcon
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 transform text-gray-medium"
                  size={18}
                />
                <Input
                  id="username"
                  className="pl-10"
                  placeholder="Username"
                  autoComplete="username"
                  {...register("username")}
                />
              </div>
              {errors.username?.message && (
                <FieldError>{errors.username?.message}</FieldError>
              )}
            </fieldset>
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
                  autoComplete="email"
                  {...register("email")}
                />
              </div>
              {errors.email?.message && (
                <FieldError>{errors.email?.message}</FieldError>
              )}
            </fieldset>
            <fieldset className="space-y-2">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <PasswordInput
                id="password"
                placeholder="Password"
                autoComplete="new-password"
                {...register("password")}
              />
              {errors.password?.message && (
                <FieldError>{errors.password?.message}</FieldError>
              )}
            </fieldset>
            <fieldset className="space-y-2">
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <PasswordInput
                id="confirmPassword"
                placeholder="Confirm Password"
                autoComplete="new-password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword?.message && (
                <FieldError>{errors.confirmPassword?.message}</FieldError>
              )}
            </fieldset>
            <button type="submit" className="btn-sm btn-primary py-2 text-lg">
              Signup
            </button>
          </form>
          <p className="text-primary">
            Already have an account?{" "}
            <Link
              href={{
                pathname: "/dashboard/auth/login",
                query: callbackUrl ? { callbackUrl: callbackUrl } : undefined,
              }}
            >
              Log in
            </Link>
          </p>
        </>
      )}
    </>
  );
}
