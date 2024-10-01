import toast from "react-hot-toast";
import { useToastContext } from "@/contexts/toast";

type UseToastNotificationOptions = {
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
  duration?: number;
};

export function useToastNotification(
  options: UseToastNotificationOptions = {},
) {
  let toastId: string | undefined;
  const { setIsToastShown } = useToastContext();

  const defaultDuration = options.duration || 2000;

  function showLoading(message?: string) {
    setIsToastShown(true);
    toastId = toast.loading(
      message || options.loadingMessage || "Sending Your Message...",
    );
  }

  function showSuccess(message?: string) {
    setIsToastShown(true);
    toast.success(
      message || options.successMessage || "Your message is sent successfully!",
      {
        id: toastId,
      },
    );

    setTimeout(() => {
      setIsToastShown(false);
    }, defaultDuration);
  }

  function showError(message?: string) {
    setIsToastShown(true);
    toast.error(
      message ||
        options.errorMessage ||
        "Something went wrong, please try again later!",
      {
        id: toastId,
      },
    );

    setTimeout(() => {
      setIsToastShown(false);
    }, defaultDuration);
  }

  return {
    showLoading,
    showSuccess,
    showError,
  };
}
