import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodObject, ZodRawShape } from "zod";
import { WithCaptcha } from "@/types";
import { getCaptchaToken } from "@/lib/recaptcha";
import { useToastNotification } from "./use-toast-notification";

type UseFormHandlerOptions<T extends object> = {
  schema: ZodObject<ZodRawShape>;
  action: string;
  serverAction: (
    data: WithCaptcha<T>,
  ) => Promise<{ success: boolean; message: string }>;
  successMessage?: string;
  loadingMessage?: string;
  errorMessage?: string;
};

export function useFormHandler<T extends Record<string, unknown>>({
  schema,
  action,
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
  } = useForm<T>({
    resolver: zodResolver(schema),
  });
  const toastNotification = useToastNotification({
    successMessage,
    loadingMessage,
    errorMessage,
  });
  const [isPending, setIsPending] = useState(false);

  const onSubmit = useCallback(
    async (data: T) => {
      if (isPending) return;

      setIsPending(true);
      toastNotification.showLoading();

      const captchaToken = await getCaptchaToken(action);

      const { success, message } = await serverAction({
        ...data,
        captchaToken,
      });

      if (success) {
        toastNotification.showSuccess(message);
        reset();
      } else {
        toastNotification.showError(message);
      }

      setIsPending(false);
    },
    [isPending, toastNotification, action, serverAction, reset],
  );

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    isPending,
    ...rest,
    ...formStateRest,
  };
}
