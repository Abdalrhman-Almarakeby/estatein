import Link from "next/link";
import { forwardRef, useId } from "react";
import { Checkbox } from "@/components/form/checkbox";
import { FieldError } from "@/components/form/field-error";

type AgreeOnTermsProps = {
  error?: string | undefined;
  className?: string;
};

export const AgreeOnTerms = forwardRef<HTMLInputElement, AgreeOnTermsProps>(
  ({ error, className, ...props }, ref) => {
    const id = useId();

    return (
      <fieldset className={className}>
        <div className="flex items-center gap-2">
          <Checkbox
            id={id}
            ref={ref}
            aria-describedby={error ? `${id}-error` : undefined}
            aria-invalid={!!error}
            {...props}
          />
          <label htmlFor={id} className="text-primary">
            I agree to the{" "}
            <Link
              href="/legal/terms-of-service"
              aria-label="Read the Terms of Service"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/legal/privacy-policy"
              aria-label="Read the Privacy Policy"
            >
              Privacy Policy
            </Link>
            .
          </label>
        </div>
        {error && (
          <FieldError id={`${id}-error`} className="!mt-1 2xl:text-base">
            {error}
          </FieldError>
        )}
      </fieldset>
    );
  },
);

AgreeOnTerms.displayName = "AgreeOnTerms";
