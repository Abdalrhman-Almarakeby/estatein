import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useContext,
} from "react";
import { OTPInputContext } from "input-otp";
import { cn } from "@/lib/utils";

export const InputOTPSlot = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = useContext(OTPInputContext);
  const slot = inputOTPContext?.slots?.[index];
  const char = slot?.char ?? "";
  const hasFakeCaret = slot?.hasFakeCaret ?? false;
  const isActive = slot?.isActive ?? false;

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-white text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 border-purple-base ring-2 ring-purple-base",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px bg-white duration-500 motion-safe:animate-caret-blink" />
        </div>
      )}
    </div>
  );
});

InputOTPSlot.displayName = "InputOTPSlot";
