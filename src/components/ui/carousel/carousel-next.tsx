"use client";

import { forwardRef } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCarousel } from "./carousel-context";

type CarouselControlButtonProps = {
  className?: string;
};

export const CarouselNext = forwardRef<
  HTMLButtonElement,
  CarouselControlButtonProps
>(({ className, ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <button
      ref={ref}
      className={cn(
        "grid size-11 place-items-center rounded-full border bg-gray-darker disabled:opacity-50",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollNext}
      onClick={() => scrollNext()}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </button>
  );
});

CarouselNext.displayName = "CarouselNext";
