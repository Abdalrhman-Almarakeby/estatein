"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ImagesThumbsCarousel } from "./images-thumbs-carousel";
import { useImagesCarousel } from "./use-images-carousel";

type ImageCarouselProps = {
  images: string[];
};

export function ImagesCarousel({ images }: ImageCarouselProps) {
  const { setEmblaMainApi, setEmblaThumbsApi, isIndexActive, onThumbClick } =
    useImagesCarousel();

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      setApi={setEmblaMainApi}
      className="grid gap-5 rounded-xl border bg-gray-darker p-5 lg:p-10 lg:pb-5 2xl:gap-7.5 2xl:p-12.5 2xl:pb-5"
    >
      <CarouselContent className="md:-ml-7.5">
        {images.map((src, i) => (
          <CarouselItem key={i} className="basis-full md:basis-1/2 md:pl-7.5">
            <Image
              src={src}
              alt={`Carousel image ${i + 1}`}
              width={620}
              height={420}
              quality={100}
              className="w-full rounded-lg object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <ImagesThumbsCarousel
        setEmblaApi={setEmblaThumbsApi}
        images={images}
        isIndexActive={isIndexActive}
        onThumbClick={onThumbClick}
        className="lg:order-first"
      />

      <div className="flex items-center justify-between rounded-full bg-gray-darkest p-2 md:gap-4 md:justify-self-center">
        <CarouselPrevious className="static translate-x-0 translate-y-0" />
        <div className="hidden min-[360px]:flex min-[360px]:gap-1">
          {images.map((src, i) => (
            <span
              key={src}
              className={cn(
                "h-[3px] w-1 rounded-full max-[360px]:w-1",
                images.length < 10 && "w-3",
                images.length < 15 && "w-2",
                images.length < 20 && "w-1.5",
                "md:w-3",
                isIndexActive(i) ? "bg-purple-base" : "bg-gray-medium",
              )}
            ></span>
          ))}
        </div>
        <CarouselNext className="static translate-x-0 translate-y-0" />
      </div>
    </Carousel>
  );
}
