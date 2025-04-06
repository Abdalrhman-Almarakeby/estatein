"use client";

import { Mail, Send } from "lucide-react";
import { FieldError } from "@/components/form/field-error";
import { Input } from "@/components/form/input";
import { cn } from "@/lib/utils";
import { useNewsletterForm } from "./use-newsletter-form";

type NewsletterFormProps = {
  className?: string;
};

export function NewsletterForm({ className }: NewsletterFormProps) {
  const { onSubmit, register, isPending, errors } = useNewsletterForm();

  return (
    <form
      onSubmit={onSubmit}
      className={cn("space-y-3 lg:w-[300px]", className)}
    >
      <p className="px-1 text-lg">Subscribe to our newsletter!</p>
      <div className="relative">
        <Mail
          className="absolute left-5 top-1/2 size-4 -translate-y-1/2 stroke-gray-light"
          aria-hidden="true"
        />
        <Input
          {...register("email")}
          placeholder="Email"
          autoComplete="email"
          className="w-full px-12 py-3.5"
        />
        <button
          disabled={isPending}
          type="submit"
          className="absolute right-1 top-1/2 grid size-10 -translate-y-1/2 place-items-center disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send aria-hidden="true" />
          <span className="sr-only">Subscribe To Our News Letter</span>
        </button>
      </div>
      {errors.email && <FieldError>{errors.email.message}</FieldError>}
    </form>
  );
}
