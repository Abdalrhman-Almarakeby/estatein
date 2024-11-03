import "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { WithCaptcha } from "@/types";
import { ResetPassword, resetPasswordSchema } from "@/lib/schemas";
import { captchaSchema } from "@/lib/schemas/captcha";
import { resetPassword } from "@/actions";

export function usePasswordResetForm(token?: string, callbackUrl?: string) {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, setError, setValue, ...rest } = useForm<
    WithCaptcha<ResetPassword>
  >({
    resolver: zodResolver(
      resetPasswordSchema
        .merge(captchaSchema)
        .refine((data) => data.password === data.confirmPassword, {
          message: "Passwords must match",
          path: ["confirmPassword"],
        }),
    ),
  });
  const captchaRef = useRef<ReCAPTCHA>(null);

  const router = useRouter();

  const onSubmit = useCallback(
    async (data: WithCaptcha<ResetPassword>) => {
      setIsLoading(true);
      captchaRef.current?.reset();
      setValue("captchaToken", "", { shouldDirty: true });

      const { success, message } = await resetPassword(data, token);

      const searchParams = new URLSearchParams();

      if (callbackUrl) {
        searchParams.set("callbackUrl", callbackUrl);
      }

      if (success) {
        router.push(`/dashboard/auth/login?${searchParams.toString()}`);
      } else {
        setError("root", { message });
        setIsLoading(false);
      }
    },
    [setValue, token, callbackUrl, router, setError],
  );

  return {
    onSubmit: handleSubmit(onSubmit),
    setValue,
    captchaRef,
    isLoading,
    ...rest,
  };
}
