import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type FieldErrorProps = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
  className?: string;
};

export const FieldError = forwardRef<HTMLParagraphElement, FieldErrorProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <p
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className={cn("text-sm text-red-500", className)}
        ref={ref}
        {...props}
      >
        {children}
      </p>
    );
  },
);

FieldError.displayName = "FieldError";
