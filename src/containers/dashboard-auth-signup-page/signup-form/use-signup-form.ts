import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { WithCaptcha } from "@/types";
import { useCapsLock } from "@/hooks";
import { getCaptchaToken } from "@/lib/recaptcha";
import { Signup, signupSchema } from "@/lib/schemas";
import { signup } from "@/server/actions";

export function useSignupForm(callbackUrl?: string) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, setError, ...rest } = useForm<WithCaptcha<Signup>>({
    resolver: zodResolver(signupSchema),
  });
  const capsLock = useCapsLock();

  const onSubmit = useCallback(
    async (data: WithCaptcha<Signup>) => {
      setIsLoading(true);

      data.captchaToken = await getCaptchaToken("signup");

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
    [callbackUrl, setError, router],
  );

  return {
    onSubmit: handleSubmit(onSubmit),
    isLoading,
    capsLock,
    ...rest,
  };
}
