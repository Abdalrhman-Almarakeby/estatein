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
import {
  formatPricingRange,
  formatPropertySize,
  upperFirst,
} from "@/lib/utils";
import {
  LOCATION_OPTIONS,
  PRICING_RANGE_OPTIONS,
  PROPERTY_SIZE_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
} from "@/constant";
import { usePropertyInquiryForm } from "./use-properties-inquiry-form";

export function PropertiesInquiryForm() {
  const { register, errors, onSubmit, control, captchaRef } =
    usePropertyInquiryForm();

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-5 rounded-xl border p-5 sm:gap-6 md:grid-cols-2 lg:gap-7.5 lg:p-20 xl:grid-cols-3 2xl:grid-cols-4 3xl:gap-12.5 3xl:p-24"
    >
      <fieldset className="space-y-2.5 lg:space-y-4">
        <label className="lg:text-lg 3xl:text-xl" htmlFor="first-name">
          First Name
        </label>
        <Input
          {...register("firstName")}
          id="first-name"
          placeholder="First Name"
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
          placeholder="Last Name"
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
        <Input {...register("email")} id="email" placeholder="Email" />
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
        <Input {...register("phone")} id="phone" placeholder="Phone Number" />
        {errors.phone?.message && (
          <FieldError className="!mt-1 2xl:text-base">
            {errors.phone.message}
          </FieldError>
        )}
      </fieldset>
      <fieldset className="space-y-2.5 lg:space-y-4">
        <label className="lg:text-lg 3xl:text-xl" htmlFor="preferred-location">
          Preferred Location
        </label>
        <Controller
          name="preferredLocation"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger
                id="preferred-location"
                ref={field.ref}
                aria-label="Select Location"
              >
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                {LOCATION_OPTIONS.map((option) => (
                  <SelectItem value={option} key={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {errors.preferredLocation?.message && (
          <FieldError className="!mt-1 2xl:text-base">
            {errors.preferredLocation.message}
          </FieldError>
        )}
      </fieldset>
      <fieldset className="space-y-2.5 lg:space-y-4">
        <label className="lg:text-lg 3xl:text-xl" htmlFor="property-type">
          Property Type
        </label>
        <Controller
          name="propertyType"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger
                id="property-type"
                ref={field.ref}
                aria-label="Select Property Type"
              >
                <SelectValue placeholder="Select Property Type" />
              </SelectTrigger>
              <SelectContent>
                {PROPERTY_TYPE_OPTIONS.map((option) => (
                  <SelectItem value={option} key={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {errors.propertyType?.message && (
          <FieldError className="!mt-1 2xl:text-base">
            {errors.propertyType.message}
          </FieldError>
        )}
      </fieldset>
      <fieldset className="space-y-2.5 lg:space-y-4">
        <label className="lg:text-lg 3xl:text-xl" htmlFor="property-size">
          Property Size
        </label>
        <Controller
          name="propertySize"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger
                id="property-size"
                ref={field.ref}
                aria-label="Select Property Size"
              >
                <SelectValue placeholder="Select Property Size" />
              </SelectTrigger>
              <SelectContent>
                {PROPERTY_SIZE_OPTIONS.map((option) => (
                  <SelectItem value={option} key={option}>
                    {formatPropertySize(option)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {errors.propertySize?.message && (
          <FieldError className="!mt-1 2xl:text-base">
            {errors.propertySize.message}
          </FieldError>
        )}
      </fieldset>
      <fieldset className="space-y-2.5 lg:space-y-4">
        <label className="lg:text-lg 3xl:text-xl" htmlFor="num-of-rooms">
          No. of Rooms
        </label>
        <Controller
          name="numOfRooms"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger
                id="num-of-rooms"
                ref={field.ref}
                aria-label="Select No. of Rooms"
              >
                <SelectValue placeholder="Select No. of Rooms" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }).map((_, i) => (
                  <SelectItem value={(i + 1).toString()} key={i}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {errors.numOfRooms?.message && (
          <FieldError className="!mt-1 2xl:text-base">
            {errors.numOfRooms.message}
          </FieldError>
        )}
      </fieldset>
      <fieldset className="space-y-2.5 lg:space-y-4">
        <label className="lg:text-lg 3xl:text-xl" htmlFor="num-of-bathrooms">
          No. of Bathrooms
        </label>
        <Controller
          name="numOfBathrooms"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger
                id="num-of-bathrooms"
                ref={field.ref}
                aria-label="Select No. of Bathrooms"
              >
                <SelectValue placeholder="Select No. of Bathrooms" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 5 }).map((_, i) => (
                  <SelectItem value={(i + 1).toString()} key={i}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.numOfBathrooms?.message && (
          <FieldError className="!mt-1 2xl:text-base">
            {errors.numOfBathrooms.message}
          </FieldError>
        )}
      </fieldset>
      <fieldset className="space-y-2.5 lg:space-y-4">
        <label className="lg:text-lg 3xl:text-xl" htmlFor="contact-method">
          Preferred Contact Method
        </label>
        <Controller
          name="preferredContactMethod"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger
                id="contact-method"
                ref={field.ref}
                aria-label="Select Preferred Contact Method"
              >
                <SelectValue placeholder="Select Preferred Contact Method" />
              </SelectTrigger>
              <SelectContent>
                {["EMAIL", "PHONE"].map((element) => (
                  <SelectItem value={element} key={element}>
                    {upperFirst(element)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {errors.preferredContactMethod?.message && (
          <FieldError className="!mt-1 2xl:text-base">
            {errors.preferredContactMethod.message}
          </FieldError>
        )}
      </fieldset>
      <fieldset className="space-y-2.5 md:col-span-2 lg:space-y-4 xl:col-span-1 2xl:col-span-2">
        <label className="lg:text-lg 3xl:text-xl" htmlFor="budget">
          Budget
        </label>
        <Controller
          name="budget"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger
                id="budget"
                ref={field.ref}
                aria-label="Select Budget"
              >
                <SelectValue placeholder="Select Budget" />
              </SelectTrigger>
              <SelectContent>
                {PRICING_RANGE_OPTIONS.map((option) => (
                  <SelectItem value={option} key={option}>
                    {formatPricingRange(option)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {errors.budget?.message && (
          <FieldError className="!mt-1 2xl:text-base">
            {errors.budget.message}
          </FieldError>
        )}
      </fieldset>
      <fieldset className="space-y-2.5 md:col-span-2 lg:space-y-4 xl:col-span-3 2xl:col-span-4">
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
      <Captcha
        className="md:col-span-2 xl:col-span-3 2xl:col-span-4"
        captchaRef={captchaRef}
        control={control}
        error={errors.captchaToken?.message}
      />
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
