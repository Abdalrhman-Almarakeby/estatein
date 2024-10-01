"use client";

import { createContext, useContext } from "react";
import useMelbaCarousel from "embla-carousel-react";
import { CarouselOptions, CarouselPlugin } from "./use-carousel";

export type CarouselContextProps = {
  carouselRef: ReturnType<typeof useMelbaCarousel>[0];
  api: ReturnType<typeof useMelbaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
};

export const CarouselContext = createContext<CarouselContextProps | null>(null);

export function useCarousel() {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}
