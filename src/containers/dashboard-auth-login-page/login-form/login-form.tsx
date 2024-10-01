"use client";

import Link from "next/link";
import { Loader2, LockIcon, UserIcon } from "lucide-react";
import { Captcha } from "@/components/form/captcha";
import { FieldError } from "@/components/form/field-error";
import { Input } from "@/components/form/input";
import { useLoginForm } from "./use-login-form";

type LoginFormProps = {
  callbackUrl?: string;
};

export function LoginForm({ callbackUrl }: LoginFormProps) {
  const {
    onSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
    captchaRef,
    isLoading,
  } = useLoginForm(callbackUrl);

  return (
    <>
      {isLoading ? (
        <div className="p-5">
          <Loader2 className="animate-spin mx-auto size-14" />
        </div>
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
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 transform text-[#4d4d4d]"
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
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 transform text-[#4d4d4d]"
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
            <Captcha
              control={control}
              captchaRef={captchaRef}
              error={errors.captchaToken?.message}
              size="compact"
            />
            <button
              type="submit"
              className="btn-sm btn-primary py-2 text-lg"
              disabled={isSubmitting}
            >
              Log In
            </button>
          </form>
          <p className="text-primary">
            Don't have an account yet?{" "}
            <Link
              href={{
                pathname: "/dashboard/auth/signup",
                query: { callbackUrl },
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
