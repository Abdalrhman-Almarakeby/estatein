import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { WithCaptcha } from "@/types";
import { Login, loginSchema } from "@/lib/schemas";
import { captchaSchema } from "@/lib/schemas/captcha";
import { login, resendVerificationEmail } from "@/server/actions";

export function useLoginForm(callbackUrl?: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [shouldVerifyEmail, setShouldVerifyEmail] = useState(false);
  const router = useRouter();
  const { handleSubmit, setError, setValue, ...rest } = useForm<
    WithCaptcha<Login>
  >({
    resolver: zodResolver(loginSchema.merge(captchaSchema)),
  });
  const captchaRef = useRef<ReCAPTCHA>(null);

  const onSubmit = useCallback(
    async (data: WithCaptcha<Login>) => {
      setIsLoading(true);
      captchaRef.current?.reset();
      setValue("captchaToken", "", { shouldDirty: true });

      const { success, message, shouldVerifyEmail } = await login(data);

      if (success) {
        await signIn("credentials", {
          ...data,
          redirect: true,
          callbackUrl: callbackUrl || "/dashboard",
        });
      } else {
        setError("root", { message });
        setIsLoading(false);
        if (shouldVerifyEmail) {
          setShouldVerifyEmail(true);
        }
      }
    },
    [callbackUrl, setValue, setError],
  );

  const handleResendEmail = async () => {
    setIsLoading(true);
    const { success, message } = await resendVerificationEmail();
    if (success) {
      const params = callbackUrl && new URLSearchParams({ callbackUrl });

      const url =
        `/dashboard/auth/verify-email${params ? (`?${params.toString()}` as const) : ""}` as const;

      router.push(url);
    } else {
      setIsLoading(false);

      return { success, message };
    }
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    setValue,
    captchaRef,
    isLoading,
    shouldVerifyEmail,
    handleResendEmail,
    ...rest,
  };
}
