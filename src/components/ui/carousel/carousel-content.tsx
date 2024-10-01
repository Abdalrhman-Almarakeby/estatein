"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { useCarousel } from "./carousel-context";

export const CarouselContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
});

CarouselContent.displayName = "CarouselContent";
