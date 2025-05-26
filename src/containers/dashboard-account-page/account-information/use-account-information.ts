import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserData, userSchema } from "@/lib/schemas";
import { updateUserData } from "@/server/actions";

export function useAccountInformation({ email, username }: UserData) {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UserData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email,
      username,
    },
  });

  async function onSubmit(data: UserData) {
    if (data.email === email && data.username === username) {
      setIsEditing(false);
      return;
    }

    const { success, message } = await updateUserData(data);

    if (!success) {
      setError("root", { message });
    }

    setIsEditing(false);
  }

  function handleCancel() {
    reset({
      email: email,
      username: username,
    });
    setIsEditing(false);
  }

  return {
    isEditing,
    setIsEditing,
    onSubmit: handleSubmit(onSubmit),
    register,
    isSubmitting,
    errors,
    handleCancel,
  };
}
