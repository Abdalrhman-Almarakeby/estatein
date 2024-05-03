import { Link } from "react-router-dom";
import { Controller } from "react-hook-form";
import { useContactForm } from "./useContactForm";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Input } from "@/components/form/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/form/Select";
import { Textarea } from "@/components/form/Textarea";
import { Checkbox } from "@/components/form/Checkbox";
import { HEAR_ABOUT_US } from "@/constant/hearAboutUs";
import { INQUIRY_TYPES } from "@/constant/inquiryTypes";

export function ContactFormSection() {
  const { register, errors, onSubmit, control } = useContactForm();

  return (
    <div className="space-y-10 md:space-y-12 lg:space-y-15 2xl:space-y-20">
      <SectionTitle
        title="Let's Connect"
        paragraph="We're excited to connect with you and learn more about your real estate goals. Use the form below to get in touch with Estatein."
      />
      <form
        onSubmit={onSubmit} 
        className="grid gap-5 rounded-xl border border-gray-15 p-5 sm:gap-6 md:grid-cols-2 lg:gap-7.5 lg:p-20 xl:grid-cols-3 3xl:gap-12.5 3xl:p-24"
      >
        <div className="space-y-2.5 lg:space-y-4">
          <label className="lg:text-lg 3xl:text-xl" htmlFor="first-name">
            First Name
          </label>
          <Input {...register("firstName")} id="first-name" placeholder="Enter Your First Name" />
          {errors.firstName && (
            <p className="!mt-1 text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>
        <div className="space-y-2.5 lg:space-y-4">
          <label className="lg:text-lg 3xl:text-xl" htmlFor="last-name">
            Last Name
          </label>
          <Input {...register("lastName")} id="last-name" placeholder="Enter Your Last Name" />
          {errors.lastName && (
            <p className="!mt-1 text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>
        <div className="space-y-2.5 lg:space-y-4">
          <label className="lg:text-lg 3xl:text-xl" htmlFor="email">
            Email
          </label>
          <Input {...register("email")} id="email" placeholder="Enter Your Email" />
          {errors.email && <p className="!mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <div className="space-y-2.5 lg:space-y-4">
          <label className="lg:text-lg 3xl:text-xl" htmlFor="phone">
            Phone
          </label>
          <Input {...register("phone")} id="phone" placeholder="Enter Your Phone Number" />
          {errors.phone && <p className="!mt-1 text-sm text-red-500">{errors.phone.message}</p>}
        </div>
        <div className="space-y-2.5 lg:space-y-4">
          <label className="lg:text-lg 3xl:text-xl" htmlFor="inquiry-type">
            Inquiry Type
          </label>
          <Controller
            name="inquiryType"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="inquiry-type" ref={field.ref}>
                  <SelectValue placeholder="Select Inquiry Type" />
                </SelectTrigger>
                <SelectContent>
                  {INQUIRY_TYPES.map((element) => (
                    <SelectItem value={element} key={element}>
                      {element}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {errors.inquiryType && (
            <p className="!mt-1 text-sm text-red-500">{errors.inquiryType.message}</p>
          )}
        </div>
        <div className="space-y-2.5 lg:space-y-4">
          <label className="lg:text-lg 3xl:text-xl" htmlFor="hearAboutUs">
            How did you hear about us?
          </label>
          <Controller
            name="hearAboutUs"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange}>
                <SelectTrigger id="hearAboutUs">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {HEAR_ABOUT_US.map((element) => (
                    <SelectItem value={element} key={element}>
                      {element}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {errors.hearAboutUs && (
            <p className="!mt-1 text-sm text-red-500">{errors.hearAboutUs.message}</p>
          )}
        </div>
        <div className="space-y-2.5 md:col-span-2 lg:space-y-4 xl:col-span-3">
          <label className="lg:text-lg 3xl:text-xl" htmlFor="message">
            Message
          </label>
          <Textarea {...register("message")} id="message" placeholder="Enter your message here" />
          {errors.message && <p className="!mt-1 text-sm text-red-500">{errors.message.message}</p>}
        </div>
        <div className="mt-2.5 flex flex-col gap-5 md:col-span-2 lg:flex-row lg:justify-between xl:col-span-3">
          <div>
            <div className="flex items-center gap-2">
              <Checkbox {...register("agreeOnTerms")} id="agree-on-terms" />
              <label
                htmlFor="agree-on-terms"
                className="text-sm text-gray-60 md:text-base 3xl:text-lg"
              >
                I agree with<>&nbsp;</>
                <Link to="/" className="underline">
                  Terms of Use
                </Link>
                <>&nbsp;</>
                and<>&nbsp;</>
                <Link to="/" className="underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.agreeOnTerms && (
              <p className="!mt-1 text-sm text-red-500">{errors.agreeOnTerms.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="rounded-lg bg-purple-60 py-3.5 text-sm lg:px-5 lg:text-base 3xl:px-6 3xl:py-4.5 3xl:text-lg"
          >
            Send Your Message
          </button>
        </div>
      </form>
    </div>
  );
}
