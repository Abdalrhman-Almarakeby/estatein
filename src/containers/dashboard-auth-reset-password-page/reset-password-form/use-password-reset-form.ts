import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { WithCaptcha } from "@/types";
import { useCapsLock, useToastNotification } from "@/hooks";
import { getCaptchaToken } from "@/lib/recaptcha";
import { ResetPassword, resetPasswordSchema } from "@/lib/schemas";
import { resetPassword } from "@/server/actions";

export function usePasswordResetForm(token?: string, callbackUrl?: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const { handleSubmit, setError, ...rest } = useForm<
    WithCaptcha<ResetPassword>
  >({
    resolver: zodResolver(resetPasswordSchema),
  });

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

      data.captchaToken = await getCaptchaToken("password-reset");

      const { success, message, isExpired } = await resetPassword(data, token);

      if (success) {
        const params = new URLSearchParams();

        if (callbackUrl) {
          params.set("callbackUrl", callbackUrl);
        }

        toast.showSuccess();
        router.push(`/dashboard/auth/login?${params.toString()}`);
      } else {
        if (isExpired) {
          setIsExpired(true);
        }

        setError("root", { message });
        setIsLoading(false);
      }
    },
    [token, callbackUrl, toast, router, setError],
  );

  return {
    onSubmit: handleSubmit(onSubmit),
    isLoading,
    isExpired,
    capsLock,
    ...rest,
  };
}
