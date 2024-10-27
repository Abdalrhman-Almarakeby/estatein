import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { Dot } from "lucide-react";

export const InputOTPSeparator = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
));

InputOTPSeparator.displayName = "InputOTPSeparator";
