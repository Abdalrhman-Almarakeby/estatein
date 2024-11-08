import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const TableRow = forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-[#4d4d4d20] data-[state=selected]:bg-gray-[#4d4d4d30]",
      className,
    )}
    {...props}
  />
));

TableRow.displayName = "TableRow";
