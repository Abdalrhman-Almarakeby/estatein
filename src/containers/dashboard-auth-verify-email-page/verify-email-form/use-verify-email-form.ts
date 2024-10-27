import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { WithCaptcha } from "@/types";
import { Otp, otpSchema } from "@/lib/schemas";
import { captchaSchema } from "@/lib/schemas/captcha";
import { verifyEmail } from "@/actions";

export function useVerifyEmailForm(callbackUrl?: string) {
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, setError, setValue, ...rest } = useForm<
    WithCaptcha<Otp>
  >({
    resolver: zodResolver(otpSchema.merge(captchaSchema)),
  });
  const captchaRef = useRef<ReCAPTCHA>(null);
  const router = useRouter();

  const onSubmit = useCallback(
    async (data: WithCaptcha<Otp>) => {
      setIsLoading(true);
      captchaRef.current?.reset();
      setValue("captchaToken", "", { shouldDirty: true });

      const { success, message } = await verifyEmail(data);

      if (success) {
        const params = callbackUrl && new URLSearchParams({ callbackUrl });

        const url =
          `/dashboard/auth/login${params ? (`?${params.toString()}` as const) : ""}` as const;

        router.push(url);
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
