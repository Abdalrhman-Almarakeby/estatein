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
    () =>
      handleSubmit(async (data: WithCaptcha<Signup>) => {
        setIsLoading(true);
        captchaRef.current?.reset();
        setValue("captchaToken", "", { shouldDirty: true });

        const { success, message } = await signup(data);

        if (success) {
          const params = callbackUrl && new URLSearchParams({ callbackUrl });

          const url =
            `/dashboard/auth/verify-email${params ? (`?${params.toString()}` as const) : ""}` as const;

          router.push(url);
        } else {
          setError("root", { message });
          setIsLoading(false);
        }
      }),
    [handleSubmit, setValue, callbackUrl, router, setError],
  );

  return {
    onSubmit,
    setValue,
    captchaRef,
    isLoading,
    ...rest,
  };
}
