import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { Content, Portal, Viewport } from "@radix-ui/react-select";
import { cn } from "@/lib/utils";
import { SelectScrollDownButton } from "./select-scroll-down-button";
import { SelectScrollUpButton } from "./select-scroll-up-button";

export const SelectContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <Portal>
    <Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 w-full min-w-[8rem] overflow-hidden rounded-md border bg-gray-darkest text-white shadow-md data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 motion-safe:data-[state=open]:animate-in motion-safe:data-[state=closed]:animate-out",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </Viewport>
      <SelectScrollDownButton />
    </Content>
  </Portal>
));

SelectContent.displayName = "SelectContent";
