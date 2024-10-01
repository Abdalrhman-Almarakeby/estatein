import { forwardRef, ComponentPropsWithoutRef, ElementRef } from "react";
import { ScrollDownButton } from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const SelectScrollDownButton = forwardRef<
  ElementRef<typeof ScrollDownButton>,
  ComponentPropsWithoutRef<typeof ScrollDownButton>
>(({ className, ...props }, ref) => (
  <ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronDown />
  </ScrollDownButton>
));

SelectScrollDownButton.displayName = "SelectScrollDownButton";
