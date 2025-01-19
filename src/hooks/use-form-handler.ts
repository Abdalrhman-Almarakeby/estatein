import { useCallback, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { ZodObject, ZodRawShape } from "zod";
import { WithCaptcha } from "@/types";
import { Captcha, captchaSchema } from "@/lib/schemas/captcha";
import { useToastNotification } from "./use-toast-notification";

type UseFormHandlerOptions<T> = {
  schema: ZodObject<ZodRawShape>;
  serverAction: (
    data: WithCaptcha<T>,
  ) => Promise<{ success: boolean; message: string }>;
  successMessage?: string;
  loadingMessage?: string;
  errorMessage?: string;
};

export function useFormHandler<T extends Record<string, unknown>>({
  schema,
  serverAction,
  successMessage,
  loadingMessage,
  errorMessage,
}: UseFormHandlerOptions<T>) {
  const {
    handleSubmit,
    formState: { errors, ...formStateRest },
    reset,
    ...rest
  } = useForm<T & Captcha>({
    resolver: zodResolver(schema.merge(captchaSchema)),
  });
  const toastNotification = useToastNotification({
    successMessage,
    loadingMessage,
    errorMessage,
  });
  const captchaRef = useRef<ReCAPTCHA>(null);
  const [isPending, setIsPending] = useState(false);

  const onSubmit = useCallback(
    async (data: WithCaptcha<T>) => {
      if (isPending) return;

      setIsPending(true);
      toastNotification.showLoading();

      const { success, message } = await serverAction(data);

      if (success) {
        toastNotification.showSuccess(message);
        reset();
      } else {
        toastNotification.showError(message);
      }

      captchaRef.current?.reset();
      setIsPending(false);
    },
    [isPending, serverAction, reset, toastNotification],
  );

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    isPending,
    captchaRef,
    ...rest,
    ...formStateRest,
  };
}
