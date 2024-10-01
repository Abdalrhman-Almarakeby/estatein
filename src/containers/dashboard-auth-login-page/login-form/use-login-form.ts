import { useCallback, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { WithCaptcha } from "@/types";
import { Login, loginZodSchema } from "@/lib/schemas";
import { captchaZodSchema } from "@/lib/schemas/captcha";
import { login } from "@/actions";

export function useLoginForm(callbackUrl?: string) {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, setError, setValue, ...rest } = useForm<
    WithCaptcha<Login>
  >({
    resolver: zodResolver(loginZodSchema.merge(captchaZodSchema)),
  });
  const captchaRef = useRef<ReCAPTCHA>(null);

  const onSubmit = useCallback(
    async (data: WithCaptcha<Login>) => {
      setIsLoading(true);
      captchaRef.current?.reset();
      setValue("captchaToken", "", { shouldDirty: true });

      const { success, message } = await login(data);

      if (success) {
        await signIn("credentials", {
          ...data,
          redirect: true,
          callbackUrl: callbackUrl || "/dashboard",
        });
      } else {
        setError("root", { message });
        setIsLoading(false);
      }
    },
    [callbackUrl, setValue, setError],
  );

  return {
    onSubmit: handleSubmit(onSubmit),
    setValue,
    captchaRef,
    isLoading,
    ...rest,
  };
}
