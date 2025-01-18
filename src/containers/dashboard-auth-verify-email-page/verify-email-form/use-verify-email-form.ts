import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { addSeconds, differenceInSeconds, minutesToSeconds } from "date-fns";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { WithCaptcha } from "@/types";
import { useToastNotification } from "@/hooks";
import { Otp, otpSchema } from "@/lib/schemas";
import { captchaSchema } from "@/lib/schemas/captcha";
import { AUTH_CONFIG } from "@/config/auth";
import { resendVerificationEmail, verifyEmail } from "@/server/actions";

export function useVerifyEmailForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [coolDownEndTime, setCoolDownEndTime] = useState<Date | null>(null);
  const [coolDownTime, setCoolDownTime] = useState(0);

  const { handleSubmit, setError, setValue, ...rest } = useForm<
    WithCaptcha<Otp>
  >({
    resolver: zodResolver(otpSchema.merge(captchaSchema)),
  });

  const captchaRef = useRef<ReCAPTCHA>(null);
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
      captchaRef.current?.reset();
      setValue("captchaToken", "", { shouldDirty: true });

      const { success, message } = await verifyEmail(data);

      if (success) {
        const params = callbackUrl && new URLSearchParams({ callbackUrl });
        const url =
          `/dashboard/auth/login${params ? (`?${params.toString()}` as const) : ""}` as const;
        toast.showSuccess();
        router.push(url);
      } else {
        setError("root", { message });
        setIsLoading(false);
      }
    },
    [setValue, callbackUrl, toast, router, setError],
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
    setValue,
    captchaRef,
    isLoading,
    resendLoading,
    coolDownTime,
    handleResendEmail,
    ...rest,
  };
}
