import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Input } from "./Input.tsx";
import MailPlusIconSVG from "@/assets/icons/email-plus.svg?react";
import MailSendingIconSVG from "@/assets/icons/mail-sending.svg?react";
import { EmailSchema, emailSchema } from "@/types/emailSchema.ts";

export function NewsletterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (email: string) => {
      const { data } = await axios.post("http://localhost:1111/newsletter", {
        email,
      });
      console.log(data);
    },
  });

  function onSubmit(data: EmailSchema) {
    mutate(data.email);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 lg:w-[300px]">
      <p className="px-1 text-lg">Subscribe to our newsletter!</p>
      <div className="relative">
        <MailPlusIconSVG className="absolute left-5 top-1/2 -translate-y-1/2" aria-hidden="true" />
        <Input
          {...register("email")}
          placeholder="Email"
          autoComplete="email"
          className="w-full px-12 py-3.5"
        />
        <button
          disabled={isPending}
          aria-label="Subscribe"
          className="absolute right-5 top-1/2 -translate-y-1/2"
        >
          <MailSendingIconSVG aria-hidden="true" />
          <span className="sr-only">Subscribe To Our News Letter</span>
        </button>
      </div>
      {errors.email && <p className=" text-sm text-red-500">{errors.email.message}</p>}
    </form>
  );
}
