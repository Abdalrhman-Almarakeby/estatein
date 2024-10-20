import { Route } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Section, SectionTitle } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { CarouselControls } from "./carousel-controls";

export { CarouselItem };

type CarouselSectionProps = {
  id: string;
  sectionName?: string;
  title: string;
  paragraph: string;
  children: ReactNode[];
  headingLevel?: number;
  link?: Route;
  viewAll?: boolean | undefined;
  className?: string;
};

export function CarouselSection({
  sectionName,
  title,
  paragraph,
  link,
  children,
  viewAll = true,
  headingLevel,
  className,
  ...props
}: CarouselSectionProps) {
  const isViewAll = viewAll && link && sectionName;

  return (
    <Section
      className={cn("space-y-10 md:space-y-12 lg:space-y-15", className)}
      {...props}
    >
      <div className="flex justify-between">
        <SectionTitle
          level={headingLevel}
          title={title}
          paragraph={paragraph}
        />
        {isViewAll && (
          <Link
            href={link}
            className="btn-tertiary btn-sm 3xl:btn-lg hidden self-end text-center lg:block"
          >
            View All {sectionName}
          </Link>
        )}
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="flex flex-col gap-7.5"
      >
        <CarouselContent className="md:-ml-5">{children}</CarouselContent>
        <CarouselControls
          sectionName={sectionName}
          link={link}
          viewAll={viewAll}
        />
      </Carousel>
    </Section>
  );
}
