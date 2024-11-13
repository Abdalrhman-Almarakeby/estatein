import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { WithCaptcha } from "@/types";
import { Email, emailSchema } from "@/lib/schemas";
import { captchaSchema } from "@/lib/schemas/captcha";
import { forgotPassword } from "@/server/actions";

export function useForgotPasswordForm(callbackUrl?: string) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { handleSubmit, setError, setValue, ...rest } = useForm<
    WithCaptcha<Email>
  >({
    resolver: zodResolver(emailSchema.merge(captchaSchema)),
  });
  const captchaRef = useRef<ReCAPTCHA>(null);

  const onSubmit = useCallback(
    async (data: WithCaptcha<Email>) => {
      setIsLoading(true);
      captchaRef.current?.reset();
      setValue("captchaToken", "", { shouldDirty: true });

      const { success, message } = await forgotPassword(data, callbackUrl);

      if (success) {
        router.push("/dashboard/auth/forgot-password/sent");
      } else {
        setError("root", { message });
        setIsLoading(false);
      }
    },
    [setValue, callbackUrl, router, setError],
  );

  return {
    onSubmit: handleSubmit(onSubmit),
    setValue,
    captchaRef,
    isLoading,
    ...rest,
  };
}
