import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { WithCaptcha } from "@/types";
import { Signup, signupSchema } from "@/lib/schemas";
import { captchaSchema } from "@/lib/schemas/captcha";
import { signup } from "@/actions";

export function useSignupForm(callbackUrl?: string) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, setError, setValue, ...rest } = useForm<
    WithCaptcha<Signup>
  >({
    resolver: zodResolver(
      signupSchema
        .merge(captchaSchema)
        .refine((data) => data.password === data.confirmPassword, {
          message: "Passwords must match",
          path: ["confirmPassword"],
        }),
    ),
  });
  const captchaRef = useRef<ReCAPTCHA>(null);

  const onSubmit = useCallback(
    async (data: WithCaptcha<Signup>) => {
      setIsLoading(true);
      captchaRef.current?.reset();
      setValue("captchaToken", "", { shouldDirty: true });

      const { success, message } = await signup(data, callbackUrl);

      if (success) {
        router.push("/dashboard/auth/check-your-email");
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
    ...rest,
  };
}
