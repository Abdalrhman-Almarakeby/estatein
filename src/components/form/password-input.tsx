"use client";

import { forwardRef, InputHTMLAttributes, useState } from "react";
import { Eye, EyeOff, LockIcon } from "lucide-react";
import { Input } from "@/components/form/input";
import { StrictOmit } from "@/types";
import { cn } from "@/lib/utils";

type PasswordInputProps = StrictOmit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  showToggle?: boolean;
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showToggle = true, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        <LockIcon
          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 transform text-[#4d4d4d]"
          size={18}
        />
        <Input
          type={showPassword ? "text" : "password"}
          className={cn(showToggle && "pr-10", className)}
          ref={ref}
          {...props}
        />
        {showToggle && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 transform text-[#4d4d4d]"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
