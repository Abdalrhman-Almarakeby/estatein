"use client";

import { forwardRef, HTMLAttributes, KeyboardEvent, useCallback } from "react";
import { cn } from "@/lib/utils";
import { CarouselContext } from "./carousel-context";
import { CarouselProps, useCarousel } from "./use-carousel";

export const Carousel = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const {
      carouselRef,
      api,
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext,
    } = useCarousel({
      orientation,
      opts,
      plugins,
      setApi,
    });

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);

Carousel.displayName = "Carousel";
