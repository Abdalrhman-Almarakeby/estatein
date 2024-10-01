import Image from "next/image";
import { UseEmblaCarouselType } from "embla-carousel-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type ImageThumbsCarouselProps = {
  images: string[];
  setEmblaApi: (api: UseEmblaCarouselType[1] | undefined) => void;
  isIndexActive: (i: number) => boolean;
  onThumbClick: (i: number) => void;
  className?: string;
};

export function ImagesThumbsCarousel({
  images,
  setEmblaApi,
  isIndexActive,
  onThumbClick,
  className,
}: ImageThumbsCarouselProps) {
  return (
    <Carousel
      opts={{
        containScroll: "keepSnaps",
        dragFree: true,
      }}
      setApi={setEmblaApi}
      className={cn(
        "rounded-xl border bg-gray-darkest p-2.5 lg:p-4 2xl:p-5",
        className,
      )}
    >
      <CarouselContent className="-ml-2.5">
        {images.map((src, i) => (
          <CarouselItem
            key={i}
            className="basis-1/4 pl-2.5 sm:basis-1/6 md:basis-[calc(1/8*100%)] lg:pl-4 2xl:basis-[10%] 2xl:pl-5"
          >
            <Image
              width={620}
              height={420}
              src={src}
              alt={`Thumbnail ${i + 1}`}
              className={cn(
                "w-full rounded-md object-cover transition-all duration-500",
                isIndexActive(i) ? "brightness-100" : "brightness-[0.3]",
              )}
              quality={90}
              onClick={() => onThumbClick(i)}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
