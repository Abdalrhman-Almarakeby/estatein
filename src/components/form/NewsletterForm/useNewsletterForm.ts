import { useState, type BaseSyntheticEvent } from "react";
import { useForm, type UseFormRegister, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { emailZodSchema, type Email } from "@/lib/schemas/emailSchema";

export function useNewsletter(): {
  register: UseFormRegister<Email>;
  onSubmit: (e?: BaseSyntheticEvent<object> | undefined) => Promise<void>;
  errors: FieldErrors<Email>;
  isPending: boolean;
} {
  const [toastId, setToastId] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Email>({
    resolver: zodResolver(emailZodSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (email: string) =>
      axios.post("https://estatein-zgvy.onrender.com/newsletter", {
        email,
      }),
    onMutate: () => {
      setToastId(toast.loading("subscribing to the newsletter..."));
    },
    onSuccess: () => {
      toast.success("subscribed successfully!", {
        id: toastId || undefined,
      });
    },
    onError: () => {
      toast.error("something went wrong, please try again later!", {
        id: toastId || undefined,
      });
    },
  });

  function onSubmit(data: Email) {
    mutate(data.email);
    reset();
  }

  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    errors,
    isPending,
  };
}