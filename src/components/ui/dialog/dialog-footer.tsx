import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const DialogFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-row justify-end gap-2", className)}
    {...props}
  />
);

DialogFooter.displayName = "DialogFooter";
