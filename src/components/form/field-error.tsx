import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type FieldErrorProps = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
  className?: string;
};

export function FieldError({ className, children, ...props }: FieldErrorProps) {
  return (
    <p
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={cn("text-sm text-red-500", className)}
      {...props}
    >
      {children}
    </p>
  );
}
