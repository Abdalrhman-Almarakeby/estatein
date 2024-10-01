"use client";

import { Controller } from "react-hook-form";
import { AgreeOnTerms } from "@/components/form/agree-on-terms";
import { Captcha } from "@/components/form/captcha";
import { FieldError } from "@/components/form/field-error";
import { Input } from "@/components/form/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/form/select";
import { Textarea } from "@/components/form/textarea";
import { upperFirst } from "@/lib/utils";
import { INQUIRY_TYPES, REFERRAL_SOURCE } from "@/constant";
import { useContactForm } from "./use-contact-form";

export function ContactForm() {
  const { register, errors, onSubmit, control, captchaRef } = useContactForm();

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-5 rounded-xl border p-5 sm:gap-6 md:grid-cols-2 lg:gap-7.5 lg:p-20 xl:grid-cols-3 3xl:gap-12.5 3xl:p-24"
    >
      <fieldset className="space-y-2.5 lg:space-y-4">
        <label className="lg:text-lg 3xl:text-xl" htmlFor="first-name">
          First Name
        </label>
        <Input
          {...register("firstName")}
          id="first-name"
          placeholder="First Name"
          aria-invalid={errors.firstName ? "true" : "false"}
        />
        {errors.firstName?.message && (
          <FieldError className="!mt-1 2xl:text-base">
            {errors.firstName.message}
          </FieldError>
        )}
      </fieldset>{" "}
      <fieldset className="space-y-2.5 lg:space-y-4">
        <label className="lg:text-lg 3xl:text-xl" htmlFor="last-name">
          Last Name
        </label>
        <Input
          {...register("lastName")}
          id="last-name"
          placeholder="Last Name"
          aria-invalid={errors.lastName ? "true" : "false"}
        />
        {errors.lastName?.message && (
          <FieldError className="!mt-1 2xl:text-base">
            {errors.lastName.message}
          </FieldError>
        )}
      </fieldset>{" "}
      <fieldset className="space-y-2.5 lg:space-y-4">
        <label className="lg:text-lg 3xl:text-xl" htmlFor="email">
          Email
        </label>
        <Input
          {...register("email")}
          id="email"
          placeholder="Email"
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email?.message && (
          <FieldError className="!mt-1 2xl:text-base">
            {errors.email.message}
          </FieldError>
        )}
      </fieldset>{" "}
      <fieldset className="space-y-2.5 lg:space-y-4">
        <label className="lg:text-lg 3xl:text-xl" htmlFor="phone">
          Phone
        </label>
        <Input
          {...register("phone")}
          id="phone"
          placeholder="Phone Number"
          aria-invalid={errors.phone ? "true" : "false"}
        />
        {errors.phone?.message && (
          <FieldError className="!mt-1 2xl:text-base">
            {errors.phone.message}
          </FieldError>
        )}
      </fieldset>{" "}
      <fieldset className="space-y-2.5 lg:space-y-4">
        <label className="lg:text-lg 3xl:text-xl" htmlFor="inquiry-type">
          Inquiry Type
        </label>
        <Controller
          name="inquiryType"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              value={field.value}
              aria-invalid={errors.inquiryType ? "true" : "false"}
            >
              <SelectTrigger
                id="inquiry-type"
                ref={field.ref}
                aria-label="Inquiry Type"
              >
                <SelectValue placeholder="Inquiry Type" />
              </SelectTrigger>
              <SelectContent>
                {INQUIRY_TYPES.map((element) => (
                  <SelectItem value={element} key={element}>
                    {upperFirst(element)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.inquiryType?.message && (
          <FieldError className="!mt-1 2xl:text-base">
            {errors.inquiryType.message}
          </FieldError>
        )}
      </fieldset>{" "}
      <fieldset className="space-y-2.5 lg:space-y-4">
        <label className="lg:text-lg 3xl:text-xl" htmlFor="referralSource">
          How did you hear about us?
        </label>
        <Controller
          name="referralSource"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              value={field.value}
              aria-invalid={errors.referralSource ? "true" : "false"}
            >
              <SelectTrigger
                id="referralSource"
                ref={field.ref}
                aria-label="How did you hear about us?"
              >
                <SelectValue placeholder="How did you hear about us?" />
              </SelectTrigger>
              <SelectContent>
                {REFERRAL_SOURCE.map(({ label, value }) => (
                  <SelectItem value={value} key={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.referralSource?.message && (
          <FieldError className="!mt-1 2xl:text-base">
            {errors.referralSource.message}
          </FieldError>
        )}
      </fieldset>{" "}
      <fieldset className="space-y-2.5 md:col-span-2 lg:space-y-4 xl:col-span-3">
        <label className="lg:text-lg 3xl:text-xl" htmlFor="message">
          Message
        </label>
        <Textarea
          {...register("message")}
          id="message"
          placeholder="Enter your message here"
          aria-invalid={errors.message ? "true" : "false"}
        />
        {errors.message?.message && (
          <FieldError className="!mt-1 2xl:text-base">
            {errors.message.message}
          </FieldError>
        )}
      </fieldset>{" "}
      <Captcha
        className="md:col-span-2 xl:col-span-3"
        captchaRef={captchaRef}
        control={control}
        error={errors.captchaToken?.message}
      />{" "}
      <div className="mt-2.5 flex flex-col gap-5 md:col-span-2 lg:flex-row lg:justify-between xl:col-span-3">
        <AgreeOnTerms
          {...register("agreeOnTerms")}
          error={errors.agreeOnTerms?.message}
        />
        <button type="submit" className="btn-primary btn-sm 3xl:btn-lg">
          Send Your Message
        </button>
      </div>
    </form>
  );
}
