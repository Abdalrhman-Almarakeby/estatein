import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-white", className)}
    {...props}
  />
));

TableCaption.displayName = "TableCaption";
