import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-white/50 font-medium [&>tr]:last:border-b-0 ",
      className,
    )}
    {...props}
  />
));

TableFooter.displayName = "TableFooter";
