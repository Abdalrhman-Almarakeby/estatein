import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { addSeconds, differenceInSeconds, minutesToSeconds } from "date-fns";
import { useForm } from "react-hook-form";
import { WithCaptcha } from "@/types";
import { useToastNotification } from "@/hooks";
import { getCaptchaToken } from "@/lib/recaptcha";
import { Otp, otpSchema } from "@/lib/schemas";
import { AUTH_CONFIG } from "@/config/auth";
import { resendVerificationEmail, verifyEmail } from "@/server/actions";

export function useVerifyEmailForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [coolDownEndTime, setCoolDownEndTime] = useState<Date | null>(null);
  const [coolDownTime, setCoolDownTime] = useState(0);

  const { handleSubmit, setError, ...rest } = useForm<WithCaptcha<Otp>>({
    resolver: zodResolver(otpSchema),
  });

  const router = useRouter();

  const toast = useToastNotification({
    successMessage:
      "Your account has been successfully created and verified! Please log in to continue.",
    duration: 5000,
  });

  useEffect(() => {
    if (!coolDownEndTime) {
      setCoolDownTime(0);
      return;
    }

    const updateCoolDown = () => {
      const now = new Date();
      const remaining = Math.max(
        0,
        Math.ceil(differenceInSeconds(coolDownEndTime, now)),
      );
      setCoolDownTime(remaining);

      if (remaining === 0) {
        setCoolDownEndTime(null);
      }
    };

    updateCoolDown();
    const timer = setInterval(updateCoolDown, 1000);
    return () => clearInterval(timer);
  }, [coolDownEndTime]);

  const onSubmit = useCallback(
    async (data: WithCaptcha<Otp>) => {
      setIsLoading(true);

      data.captchaToken = await getCaptchaToken("verifyEmail");

      const { success, message } = await verifyEmail(data);

      if (success) {
        const params = callbackUrl && new URLSearchParams({ callbackUrl });
        const queryString = params ? (`?${params.toString()}` as const) : "";
        const url = `/dashboard/auth/login${queryString}` as const;

        toast.showSuccess();
        router.push(url);
      } else {
        setError("root", { message });
        setIsLoading(false);
      }
    },
    [callbackUrl, toast, router, setError],
  );

  const handleResendEmail = async () => {
    if (coolDownEndTime) return;

    setResendLoading(true);
    const { success, message } = await resendVerificationEmail();
    setCoolDownEndTime(
      addSeconds(
        new Date(),
        minutesToSeconds(AUTH_CONFIG.emailVerification.resend.windowMinutes),
      ),
    );
    setResendLoading(false);

    return { success, message };
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    isLoading,
    resendLoading,
    coolDownTime,
    handleResendEmail,
    ...rest,
  };
}
