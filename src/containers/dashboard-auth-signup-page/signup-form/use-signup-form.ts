import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { WithCaptcha } from "@/types";
import { useCapsLock } from "@/hooks";
import { Signup, signupSchema } from "@/lib/schemas";
import { captchaSchema } from "@/lib/schemas/captcha";
import { signup } from "@/server/actions";

export function useSignupForm(callbackUrl?: string) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, setError, setValue, ...rest } = useForm<
    WithCaptcha<Signup>
  >({
    resolver: zodResolver(signupSchema.and(captchaSchema)),
  });
  const captchaRef = useRef<ReCAPTCHA>(null);
  const capsLock = useCapsLock();

  const onSubmit = useCallback(
    async (data: WithCaptcha<Signup>) => {
      setIsLoading(true);
      captchaRef.current?.reset();
      setValue("captchaToken", "", { shouldDirty: true });

      const { success, message } = await signup(data);

      if (success) {
        const params = callbackUrl && new URLSearchParams({ callbackUrl });
        const queryString = params ? (`?${params.toString()}` as const) : "";
        const url = `/dashboard/auth/verify-email${queryString}` as const;

        router.push(url);
      } else {
        setError("root", { message });
        setIsLoading(false);
      }
    },
    [callbackUrl, setValue, setError, router],
  );

  return {
    onSubmit: handleSubmit(onSubmit),
    setValue,
    captchaRef,
    isLoading,
    capsLock,
    ...rest,
  };
}
