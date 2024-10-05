"use client";

import Link from "next/link";
import { Loader2, LockIcon, UserIcon } from "lucide-react";
import { Captcha } from "@/components/form/captcha";
import { FieldError } from "@/components/form/field-error";
import { Input } from "@/components/form/input";
import { useSignupForm } from "./use-signup-form";

type SignupFormProps = {
  callbackUrl?: string | undefined;
};

export function SignupForm({ callbackUrl }: SignupFormProps) {
  const {
    onSubmit,
    formState: { errors },
    control,
    register,
    captchaRef,
    isLoading,
  } = useSignupForm(callbackUrl);

  return (
    <>
      {isLoading ? (
        <div className="p-5">
          <Loader2 className="mx-auto size-14 animate-spin" />
        </div>
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
              <div className="relative">
                <LockIcon
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 transform text-gray-medium"
                  size={18}
                />
                <Input
                  id="password"
                  className="pl-10"
                  placeholder="Password"
                  {...register("password")}
                />
              </div>
              {errors.password?.message && (
                <FieldError>{errors.password?.message}</FieldError>
              )}
            </fieldset>
            <fieldset className="space-y-2">
              <label htmlFor="confirmPassword" className="sr-only">
                ConfirmPassword
              </label>
              <div className="relative">
                <LockIcon
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 transform text-gray-medium"
                  size={18}
                />
                <Input
                  id="confirmPassword"
                  className="pl-10"
                  placeholder="ConfirmPassword"
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
              size="compact"
            />
            <button type="submit" className="btn-sm btn-primary py-2 text-lg">
              Signup
            </button>
          </form>
          <p className="text-primary">
            Already have an account?{" "}
            <Link
              href={{
                pathname: "/dashboard/auth/login",
                query: { callbackUrl },
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
