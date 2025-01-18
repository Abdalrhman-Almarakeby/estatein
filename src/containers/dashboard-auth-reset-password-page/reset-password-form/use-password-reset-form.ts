import "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { WithCaptcha } from "@/types";
import { useCapsLock, useToastNotification } from "@/hooks";
import { ResetPassword, resetPasswordSchema } from "@/lib/schemas";
import { captchaSchema } from "@/lib/schemas/captcha";
import { resetPassword } from "@/server/actions";

export function usePasswordResetForm(token?: string, callbackUrl?: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const { handleSubmit, setError, setValue, ...rest } = useForm<
    WithCaptcha<ResetPassword>
  >({
    resolver: zodResolver(resetPasswordSchema.and(captchaSchema)),
  });
  const captchaRef = useRef<ReCAPTCHA>(null);

  const router = useRouter();

  const toast = useToastNotification({
    successMessage:
      "Your password has been successfully reset! Please log in to continue.",
    duration: 5000,
  });

  const capsLock = useCapsLock();

  const onSubmit = useCallback(
    async (data: WithCaptcha<ResetPassword>) => {
      setIsLoading(true);
      captchaRef.current?.reset();
      setValue("captchaToken", "", { shouldDirty: true });

      const { success, message, isExpired } = await resetPassword(data, token);

      if (success) {
        const searchParams = new URLSearchParams();

        if (callbackUrl) {
          searchParams.set("callbackUrl", callbackUrl);
        }
        toast.showSuccess();
        router.push(`/dashboard/auth/login?${searchParams.toString()}`);
      } else {
        if (isExpired) {
          setIsExpired(true);
        }

        setError("root", { message });
        setIsLoading(false);
      }
    },
    [setValue, token, callbackUrl, toast, router, setError],
  );

  return {
    onSubmit: handleSubmit(onSubmit),
    setValue,
    captchaRef,
    isLoading,
    isExpired,
    capsLock,
    ...rest,
  };
}
