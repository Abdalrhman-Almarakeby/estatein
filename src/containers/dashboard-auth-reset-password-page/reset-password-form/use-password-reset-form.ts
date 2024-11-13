import "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { WithCaptcha } from "@/types";
import { ResetPassword, resetPasswordSchema } from "@/lib/schemas";
import { captchaSchema } from "@/lib/schemas/captcha";
import { resetPassword } from "@/server/actions";

export function usePasswordResetForm(token?: string, callbackUrl?: string) {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, setError, setValue, ...rest } = useForm<
    WithCaptcha<ResetPassword>
  >({
    resolver: zodResolver(resetPasswordSchema.and(captchaSchema)),
  });
  const captchaRef = useRef<ReCAPTCHA>(null);

  const router = useRouter();

  const onSubmit = useCallback(
    async (data: WithCaptcha<ResetPassword>) => {
      setIsLoading(true);
      captchaRef.current?.reset();
      setValue("captchaToken", "", { shouldDirty: true });

      const { success, message } = await resetPassword(data, token);

      if (success) {
        const searchParams = new URLSearchParams();

        if (callbackUrl) {
          searchParams.set("callbackUrl", callbackUrl);
        }
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
