import Image from "next/image";
import { SectionTitle } from "@/components/ui/section";
import WavesSVG from "@/assets/abstract-designs/waves-1.svg";
import { GALLERY_IMAGES } from "@/constant";

export function GallerySection() {
  return (
    <section className="relative grid grid-cols-4 gap-2.5 overflow-hidden rounded-xl border p-6 lg:gap-5 lg:p-15 3xl:p-20">
      <WavesSVG className="absolute left-0 top-0 h-full w-[150%]" />
      {GALLERY_IMAGES.map(({ src, alt }) => (
        <Image
          key={src.src}
          src={src}
          alt={alt}
          loading="lazy"
          className="z-10 aspect-[2/1] w-full rounded-[0.625rem] object-cover last-of-type:order-last last-of-type:col-span-4 last-of-type:mt-2.5 last-of-type:object-cover last-of-type:object-top last-of-type:md:col-span-2 last-of-type:md:mt-0 [&:nth-of-type(-n+3)]:col-span-2 [&:nth-of-type(4)]:aspect-square [&:nth-of-type(5)]:aspect-square"
        />
      ))}
      <SectionTitle
        title="Explore Estatein's World"
        paragraph="Step inside the world of Estatein, where professionalism meets warmth, and expertise meets passion. Our gallery offers a glimpse into our team and workspaces, inviting you to get to know us better."
        className="z-10 col-span-4 mt-11 self-center md:col-span-2 md:my-7.5"
      />
    </section>
  );
}
