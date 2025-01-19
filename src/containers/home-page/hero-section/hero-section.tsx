import Image from "next/image";
import Link from "next/link";
import { Achievement } from "@/components/ui/achievement";
import { LinksSection } from "@/components/ui/links-section";
import { HOME_PAGE_LINKS_DATA } from "@/content";
import heroImg from "@/assets/imgs/landing-page-hero.webp";
import { HeroSectionPropertiesLink } from "./hero-section-properties-link";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="grid gap-10 pt-10 md:grid-cols-2 md:gap-y-16 lg:gap-y-10 xl:gap-y-16 xl:pt-24.5 2xl:gap-x-15 2xl:gap-y-0 2xl:pt-0 min-[1700px]:gap-y-16 min-[1700px]:pt-24.5"
    >
      <section className="relative mb-4 2xl:mr-break-out min-[1700px]:container lg:order-2 lg:row-span-2 xl:row-span-3 xl:mb-0 min-[1700px]:!p-0">
        <Image
          src={heroImg}
          alt="A digital illustration of a group of futuristic blue skyscrapers with a sleek design against a dark background, evoking a sense of advanced urban architecture. The buildings are illuminated with a grid-like pattern that gives them a glowing effect."
          className="aspect-[690/622] w-full rounded-xl"
          priority
        />
        <HeroSectionPropertiesLink />
      </section>
      <section className="flex flex-col gap-4 sm:gap-6 lg:order-1 lg:mt-auto 2xl:mb-12.5 2xl:mt-24.5 min-[1700px]:mt-0">
        <h1 className="text-[1.75rem] font-semibold leading-tight min-[450px]:text-3xl sm:text-4xl 2xl:text-[2.5rem] 3xl:text-5xl">
          Discover Your Dream Property with Estatein
        </h1>
        <p className="text-primary min-[450px]:text-base sm:text-xl 3xl:text-lg">
          Your journey to finding the perfect property begins here. Explore our
          listings to find the home that matches your dreams.
        </p>
      </section>
      <nav className="flex flex-col gap-4 text-center text-sm sm:flex-row sm:text-base md:col-span-2 lg:order-3 lg:col-span-1 lg:items-start 2xl:mb-12.5 3xl:text-lg">
        <Link
          aria-label="Explore Our Story"
          className="btn-secondary btn-sm 3xl:btn-lg flex-grow lg:flex-grow-0"
          href="/about"
        >
          Explore Our Story
        </Link>
        <Link
          aria-label="Browse properties"
          className="btn-primary btn-sm 3xl:btn-lg flex-grow lg:flex-grow-0"
          href="/properties"
        >
          Browse Properties
        </Link>
      </nav>
      <section className="grid gap-3 text-center xs:grid-cols-2 sm:grid-cols-3 md:col-span-2 lg:order-4 lg:mb-6 xl:col-span-1 xl:mb-0 2xl:col-span-1 2xl:mb-24.5 2xl:items-center min-[1700px]:mb-0">
        <Achievement achievement="200+" label="Happy Customer" />
        <Achievement achievement="10K+" label="Properties For Clients" />
        <Achievement
          achievement="16+"
          label="Years Of Experience"
          className="xs:col-span-2"
        />
      </section>
      <LinksSection linksData={HOME_PAGE_LINKS_DATA} />
    </section>
  );
}
