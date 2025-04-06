import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { WithCaptcha } from "@/types";
import { getCaptchaToken } from "@/lib/recaptcha";
import { Email, emailSchema } from "@/lib/schemas";
import { forgotPassword } from "@/server/actions";

export function useForgotPasswordForm(callbackUrl?: string) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { handleSubmit, setError, ...rest } = useForm<WithCaptcha<Email>>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = useCallback(
    async (data: WithCaptcha<Email>) => {
      setIsLoading(true);

      data.captchaToken = await getCaptchaToken("forgot-password");

      const { success, message } = await forgotPassword(data, callbackUrl);

      if (success) {
        router.push("/dashboard/auth/forgot-password/sent");
      } else {
        setError("root", { message });
        setIsLoading(false);
      }
    },
    [callbackUrl, router, setError],
  );

  return {
    onSubmit: handleSubmit(onSubmit),
    isLoading,
    ...rest,
  };
}
