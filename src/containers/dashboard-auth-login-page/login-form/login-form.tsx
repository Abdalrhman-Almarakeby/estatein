"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { UserIcon } from "lucide-react";
import { Captcha } from "@/components/form/captcha";
import { FieldError } from "@/components/form/field-error";
import { Input } from "@/components/form/input";
import { PasswordInput } from "@/components/form/password-input";
import { DashboardAuthLoading } from "@/containers/dashboard-auth-layout/dashboard-auth-loading";
import { useLoginForm } from "./use-login-form";

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const {
    onSubmit,
    register,
    control,
    formState: { errors },
    captchaRef,
    isLoading,
    shouldVerifyEmail,
    handleResendEmail,
  } = useLoginForm(callbackUrl ?? undefined);

  return (
    <>
      {isLoading ? (
        <DashboardAuthLoading />
      ) : (
        <>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Dashboard Login</h1>
            <p className="text-primary text-base font-normal">
              Enter your credentials to access the dashboard
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
            <fieldset className="space-y-2">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <PasswordInput
                id="password"
                className="pl-10"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password?.message && (
                <FieldError>{errors.password?.message}</FieldError>
              )}
              <Link
                href={{
                  pathname: "/dashboard/auth/forgot-password",
                  query: callbackUrl ? { callbackUrl: callbackUrl } : undefined,
                }}
                className="text-primary block ps-2 text-start"
              >
                Forgot your password?
              </Link>
            </fieldset>
            <Captcha
              control={control}
              captchaRef={captchaRef}
              error={errors.captchaToken?.message}
              size="normal"
            />

            {shouldVerifyEmail ? (
              <div className="space-y-2">
                <FieldError>To Verify your email please click here:</FieldError>
                <button
                  type="button"
                  className="btn-sm btn-primary py-2 text-lg"
                  onClick={handleResendEmail}
                >
                  Resend Verification Email
                </button>
              </div>
            ) : (
              <button
                type="submit"
                className="btn-sm btn-primary py-2 text-lg"
                disabled={isLoading || shouldVerifyEmail}
              >
                Log In
              </button>
            )}
          </form>
          <p className="text-primary">
            Don't have an account yet?{" "}
            <Link
              href={{
                pathname: "/dashboard/auth/signup",
                query: callbackUrl ? { callbackUrl: callbackUrl } : undefined,
              }}
            >
              Create an account
            </Link>
          </p>
        </>
      )}
    </>
  );
}
