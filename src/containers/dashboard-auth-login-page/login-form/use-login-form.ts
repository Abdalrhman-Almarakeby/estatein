import { Route } from "next";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { WithCaptcha } from "@/types";
import { useCapsLock } from "@/hooks";
import { getCaptchaToken } from "@/lib/recaptcha";
import { Login, loginSchema } from "@/lib/schemas";
import { login, resendVerificationEmail } from "@/server/actions";

export function useLoginForm(callbackUrl?: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [shouldVerifyEmail, setShouldVerifyEmail] = useState(false);
  const router = useRouter();
  const { handleSubmit, setError, ...rest } = useForm<WithCaptcha<Login>>({
    resolver: zodResolver(loginSchema),
  });
  const capsLock = useCapsLock();

  const onSubmit = useCallback(
    async (data: WithCaptcha<Login>) => {
      setIsLoading(true);

      data.captchaToken = await getCaptchaToken("login");

      const { success, message, shouldVerifyEmail } = await login(data);

      if (success) {
        const url = callbackUrl || "/dashboard";

        router.push(url as Route);
      } else {
        setError("root", { message });
        setIsLoading(false);
        if (shouldVerifyEmail) {
          setShouldVerifyEmail(true);
        }
      }
    },
    [callbackUrl, setError, router],
  );

  const handleResendEmail = async () => {
    setIsLoading(true);
    const { success, message } = await resendVerificationEmail();
    if (success) {
      const params = callbackUrl && new URLSearchParams({ callbackUrl });
      const queryString = params ? (`?${params.toString()}` as const) : "";
      const url = `/dashboard/auth/verify-email${queryString}` as const;

      router.push(url);
    } else {
      setIsLoading(false);

      return { success, message };
    }
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    isLoading,
    shouldVerifyEmail,
    handleResendEmail,
    capsLock,
    ...rest,
  };
}
