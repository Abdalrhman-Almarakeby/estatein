import { useCallback, useEffect, useState } from "react";
import { CarouselApi } from "@/components/ui/carousel";
import { useWindowSize } from "@/hooks";

export function useImagesCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainApi, setEmblaMainApi] = useState<CarouselApi | null>(null);
  const [emblaThumbsApi, setEmblaThumbsApi] = useState<CarouselApi | null>(
    null,
  );
  const { width } = useWindowSize();

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
    return () => {
      emblaMainApi.off("select", onSelect);
      emblaMainApi.off("reInit", onSelect);
    };
  }, [emblaMainApi, onSelect]);

  const isIndexActive = useCallback(
    (index: number) => {
      const isSelected = index === selectedIndex;
      const isNext = index === selectedIndex + 1;
      const isPrev = index === selectedIndex - 1;

      const isTwoSlidesInView = width > 767;

      if (isTwoSlidesInView) {
        const isLastSlide =
          emblaMainApi?.slideNodes().length &&
          selectedIndex === emblaMainApi?.slideNodes().length - 1;
        return isSelected || (isLastSlide ? isPrev : isNext);
      }

      return isSelected;
    },
    [emblaMainApi, selectedIndex, width],
  );

  return {
    setEmblaMainApi,
    setEmblaThumbsApi,
    isIndexActive,
    onThumbClick,
  };
}
