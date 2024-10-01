"use client";

import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes } from "react";
import { useCarousel } from "./carousel-context";

export const CarouselItem = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className,children, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "flex min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

CarouselItem.displayName = "CarouselItem";
