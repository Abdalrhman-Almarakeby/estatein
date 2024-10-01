import { forwardRef, ComponentPropsWithoutRef, ElementRef } from "react";
import { Trigger, Icon } from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const SelectTrigger = forwardRef<
  ElementRef<typeof Trigger>,
  ComponentPropsWithoutRef<typeof Trigger>
>(({ className, children, ...props }, ref) => (
  <Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border bg-gray-darker px-5 py-4 text-sm capitalize text-white ring-offset-white focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 lg:py-5 3xl:py-6 [&>span]:line-clamp-1",
      "data-[placeholder]:text-gray-light",
      className,
    )}
    {...props}
  >
    {children}
    <Icon asChild>
      <ChevronDown />
    </Icon>
  </Trigger>
));

SelectTrigger.displayName = "SelectTrigger";
