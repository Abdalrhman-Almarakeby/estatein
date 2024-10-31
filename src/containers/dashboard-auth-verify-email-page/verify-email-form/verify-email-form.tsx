"use client";

import { useSearchParams } from "next/navigation";
import { Controller } from "react-hook-form";
import { Captcha } from "@/components/form/captcha";
import { FieldError } from "@/components/form/field-error";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { DashboardAuthLoading } from "@/containers/dashboard-auth-layout/dashboard-auth-loading";
import { useVerifyEmailForm } from "./use-verify-email-form";

export function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const {
    onSubmit,
    control,
    formState: { errors },
    captchaRef,
    isLoading,
  } = useVerifyEmailForm(callbackUrl ?? undefined);

  return (
    <>
      {isLoading ? (
        <DashboardAuthLoading />
      ) : (
        <>
          <h1 className="text-3xl font-bold text-white">Verify Your Email</h1>
          <form
            onSubmit={onSubmit}
            className="mt-6 flex flex-col items-center gap-8"
          >
            {errors.root?.message && (
              <FieldError>{errors.root?.message}</FieldError>
            )}
            <fieldset className="flex flex-col items-center">
              <label htmlFor="otp" className="sr-only">
                Verification Code
              </label>
              <Controller
                key="otp"
                name="otp"
                control={control}
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <InputOTP
                    id="otp"
                    maxLength={6}
                    value={value || ""}
                    ref={ref}
                    onChange={(newValue: string) =>
                      onChange({ target: { value: newValue } })
                    }
                    onBlur={onBlur}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />
              {errors.otp?.message && (
                <FieldError>{errors.otp?.message}</FieldError>
              )}
            </fieldset>
            <Captcha
              control={control}
              captchaRef={captchaRef}
              error={errors.captchaToken?.message}
              size="normal"
            />
            <p className="mt-3 text-sm italic text-gray-light">
              Please enter the 6-digit code sent to your email.
            </p>
            <button
              type="submit"
              className="btn-primary btn-md mx-auto w-fit px-8 py-2 text-base"
              disabled={isLoading}
            >
              Verify Email
            </button>
          </form>
        </>
      )}
    </>
  );
}
