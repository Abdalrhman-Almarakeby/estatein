import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

type PropertyImageProps = {
  src: StaticImageData | string;
  alt: string;
  className?: string;
};

export const PropertyImage = ({ src, alt, className }: PropertyImageProps) => {
  return (
    <Image
      src={src}
      quality={100}
      width={620}
      height={420}
      alt={alt}
      className={cn("aspect-[31/21] rounded-[0.625rem]", className)}
    />
  );
};
