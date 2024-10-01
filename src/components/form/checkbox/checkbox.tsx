import { forwardRef, InputHTMLAttributes } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative size-6">
        <input
          type="checkbox"
          className={cn(
            "0 peer size-6 appearance-none rounded-[4px] border ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        <span
          className="pointer-events-none absolute left-1/2 top-1/2 hidden size-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center peer-checked:flex"
          aria-hidden="true"
        >
          <Check />
        </span>
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
