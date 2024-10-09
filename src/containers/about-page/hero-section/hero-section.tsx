import Image from "next/image";
import { Achievement } from "@/components/ui/achievement";
import { SectionTitle } from "@/components/ui/section";
import heroImg from "@/assets/imgs/about-page-hero.webp";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="grid gap-14 pt-10 md:grid-cols-2 md:gap-y-16 lg:gap-y-10 xl:gap-y-16 xl:pt-24.5 2xl:gap-x-15 2xl:gap-y-0 min-[1700px]:gap-y-16 min-[1700px]:pt-24.5"
    >
      <Image
        src={heroImg}
        alt="Hand holding a miniature model of a modern two-story house with a dark roof, large windows, and a contemporary design, against a dark background."
        className="aspect-[358/310] w-full md:order-2 xl:row-span-2"
      />
      <SectionTitle
        title="Our Journey"
        level={1}
        paragraph="Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary. Over the years, we've expanded our reach, forged valuable partnerships, and gained the trust of countless clients."
        className="md:place-self-center"
      />
      <section className="grid gap-3 text-center xs:grid-cols-2 sm:grid-cols-3 md:order-3 md:col-span-2 lg:order-4 xl:col-span-1 xl:place-self-start 2xl:items-center">
        <Achievement
          achievement="200+"
          label="Happy Customer"
          className="3xl:whitespace-nowrap 3xl:px-6"
        />
        <Achievement
          achievement="10K+"
          label="Properties For Clients"
          className="3xl:whitespace-nowrap 3xl:px-6"
        />
        <Achievement
          achievement="16+"
          label="Years Of Experience"
          className="xs:col-span-2 3xl:whitespace-nowrap 3xl:px-6"
        />
      </section>
    </section>
  );
}
