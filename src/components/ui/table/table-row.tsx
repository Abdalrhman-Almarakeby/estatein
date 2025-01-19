import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const TableRow = forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "data-[state=selected]:bg-gray-[#4d4d4d30] border-b transition-colors hover:bg-[#4d4d4d20]",
      className,
    )}
    {...props}
  />
));

TableRow.displayName = "TableRow";
