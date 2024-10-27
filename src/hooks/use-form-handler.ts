import { Captcha, captchaSchema } from "@/lib/schemas/captcha";
import { WithCaptcha } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { ZodObject, ZodRawShape } from "zod";
import { useToastNotification } from "./use-toast-notification";

type UseFormHandlerOptions<T> = {
  schema: ZodObject<ZodRawShape>;
  serverAction: (
    data: WithCaptcha<T>,
  ) => Promise<{ success: boolean; message: string }>;
  successMessage?: string;
  errorMessage?: string;
};

export function useFormHandler<T extends Record<string, unknown>>({
  schema,
  serverAction,
  successMessage,
  errorMessage,
}: UseFormHandlerOptions<T>) {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    ...rest
  } = useForm<T & Captcha>({
    resolver: zodResolver(schema.merge(captchaSchema)),
  });
  const toastNotification = useToastNotification({
    successMessage,
    errorMessage,
  });
  const captchaRef = useRef<ReCAPTCHA>(null);
  const [isPending, setIsPending] = useState(false);

  const onSubmit = useCallback(()=>handleSubmit(
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
    }),
    [handleSubmit, isPending, toastNotification, serverAction, reset],
  );

  return {
    onSubmit,
    errors,
    isPending,
    captchaRef,
    ...rest,
  };
}
