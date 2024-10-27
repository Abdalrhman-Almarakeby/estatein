import { useCallback, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { WithCaptcha } from "@/types";
import { Login, loginSchema } from "@/lib/schemas";
import { captchaSchema } from "@/lib/schemas/captcha";
import { login } from "@/actions";

export function useLoginForm(callbackUrl?: string) {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, setError, setValue, ...rest } = useForm<
    WithCaptcha<Login>
  >({
    resolver: zodResolver(loginSchema.merge(captchaSchema)),
  });
  const captchaRef = useRef<ReCAPTCHA>(null);

  const onSubmit = useCallback(
    () =>
      handleSubmit(async (data: WithCaptcha<Login>) => {
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
      }),
    [handleSubmit, setValue, callbackUrl, setError],
  );

  return {
    onSubmit,
    setValue,
    captchaRef,
    isLoading,
    ...rest,
  };
}
