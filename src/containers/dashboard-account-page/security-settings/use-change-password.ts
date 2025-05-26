import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToastNotification } from "@/hooks";
import { ChangePassword, changePasswordSchema } from "@/lib/schemas";
import { changePassword } from "@/server/actions";

export function useChangePassword() {
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
    ...rest
  } = useForm<ChangePassword>({
    resolver: zodResolver(changePasswordSchema),
  });

  const { showSuccess } = useToastNotification({
    successMessage: "Password changed successfully",
  });

  async function onSubmit(data: ChangePassword) {
    const { success, message } = await changePassword(data);

    if (success) {
      setShowPasswordDialog(false);
      reset();
      showSuccess();
    } else {
      setError("root", { message });
    }
  }

  function onPasswordDialogChange(change: boolean) {
    if (!change) {
      reset();
    }
    setShowPasswordDialog(change);
  }

  return {
    showPasswordDialog,
    setShowPasswordDialog,
    isSubmitting,
    reset,
    onSubmit: handleSubmit(onSubmit),
    onPasswordDialogChange,
    errors,
    ...rest,
  };
}
