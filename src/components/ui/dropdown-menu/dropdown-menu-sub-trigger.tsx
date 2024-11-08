import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { SubTrigger } from "@radix-ui/react-dropdown-menu";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const DropdownMenuSubTrigger = forwardRef<
  ElementRef<typeof SubTrigger>,
  ComponentPropsWithoutRef<typeof SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-gray-darkest data-[state=open]:bg-gray-darkest [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </SubTrigger>
));

DropdownMenuSubTrigger.displayName = SubTrigger.displayName;
