"use client";

import { AgreeOnTerms } from "@/components/form/agree-on-terms";
import { FieldError } from "@/components/form/field-error";
import { Input } from "@/components/form/input";
import { Textarea } from "@/components/form/textarea";
import { useSpecificPropertyInquiryForm } from "./use-specific-property-inquiry-form";

type SpecificPropertyInquiryFormProps = {
  propertyId: string;
};

export function SpecificPropertyInquiryForm({
  propertyId,
}: SpecificPropertyInquiryFormProps) {
  const { register, errors, onSubmit, isPending } =
    useSpecificPropertyInquiryForm();

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-5 rounded-xl border p-5 sm:gap-6 md:grid-cols-2 lg:gap-7.5 lg:p-20 xl:grid-cols-3 2xl:grid-cols-4 3xl:gap-12.5 3xl:p-24"
    >
      {/*
        Hidden input for the property id so it 
        can be send and revalidate with the other data
        with out the user type it out.
      */}
      <input
        type="hidden"
        {...register("propertyId", {
          value: propertyId,
        })}
      />
      <fieldset className="space-y-2.5 lg:space-y-4">
        <label className="lg:text-lg 3xl:text-xl" htmlFor="first-name">
          First Name
        </label>
        <Input
          {...register("firstName")}
          id="first-name"
          placeholder="Enter Your First Name"
        />
        {errors.firstName?.message && (
          <FieldError className="!mt-1 2xl:text-base">
            {errors.firstName.message}
          </FieldError>
        )}
      </fieldset>
      <fieldset className="space-y-2.5 lg:space-y-4">
        <label className="lg:text-lg 3xl:text-xl" htmlFor="last-name">
          Last Name
        </label>
        <Input
          {...register("lastName")}
          id="last-name"
          placeholder="Enter Your Last Name"
        />
        {errors.lastName?.message && (
          <FieldError className="!mt-1 2xl:text-base">
            {errors.lastName.message}
          </FieldError>
        )}
      </fieldset>
      <fieldset className="space-y-2.5 lg:space-y-4">
        <label className="lg:text-lg 3xl:text-xl" htmlFor="email">
          Email
        </label>
        <Input
          {...register("email")}
          id="email"
          placeholder="Enter Your Email"
        />
        {errors.email?.message && (
          <FieldError className="!mt-1 2xl:text-base">
            {errors.email.message}
          </FieldError>
        )}
      </fieldset>
      <fieldset className="space-y-2.5 lg:space-y-4">
        <label className="lg:text-lg 3xl:text-xl" htmlFor="phone">
          Phone
        </label>
        <Input
          {...register("phone")}
          id="phone"
          placeholder="Enter Your Phone Number"
        />
        {errors.phone?.message && (
          <FieldError className="!mt-1 2xl:text-base">
            {errors.phone.message}
          </FieldError>
        )}
      </fieldset>
      <fieldset className="space-y-2.5 md:col-span-2 xl:col-span-3 2xl:col-span-4">
        <label className="lg:text-lg 3xl:text-xl" htmlFor="message">
          Message
        </label>
        <Textarea
          {...register("message")}
          id="message"
          placeholder="Enter your message here"
        />
        {errors.message?.message && (
          <FieldError className="!mt-1 2xl:text-base">
            {errors.message.message}
          </FieldError>
        )}
      </fieldset>
      <div className="mt-2.5 flex flex-col gap-5 md:col-span-2 lg:flex-row lg:items-center lg:justify-between xl:col-span-3 2xl:col-span-4">
        <AgreeOnTerms
          {...register("agreeOnTerms")}
          error={errors.agreeOnTerms?.message}
        />
        <button
          type="submit"
          className="btn-primary btn-sm 3xl:btn-lg"
          disabled={isPending}
        >
          Send Your Message
        </button>
      </div>
    </form>
  );
}
