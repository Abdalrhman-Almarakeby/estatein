import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { Item, ItemIndicator, ItemText } from "@radix-ui/react-select";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const SelectItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item>
>(({ className, children, ...props }, ref) => (
  <Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm capitalize outline-none focus:bg-gray-darker focus:ring-2 focus:ring-white focus:ring-offset-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <ItemIndicator>
        <Check />
      </ItemIndicator>
    </span>

    <ItemText>{children}</ItemText>
  </Item>
));

SelectItem.displayName = "SelectItem";
