"use client";

import { forwardRef } from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCarousel } from "./carousel-context";

type CarouselControlButtonProps = {
  className?: string;
};

export const CarouselPrevious = forwardRef<
  HTMLButtonElement,
  CarouselControlButtonProps
>(({ className, ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <button
      ref={ref}
      className={cn(
        "grid size-11 place-items-center rounded-full border bg-gray-darker disabled:opacity-50",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={() => scrollPrev()}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </button>
  );
});

CarouselPrevious.displayName = "CarouselPrevious";
