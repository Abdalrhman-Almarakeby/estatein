import { Route } from "next";
import Link from "next/link";
import { CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type CarouselControlsProps = {
  sectionName?: string;
  link?: Route;
  viewAll?: boolean;
  className?: string;
};

export function CarouselControls({
  sectionName,
  link,
  viewAll,
}: CarouselControlsProps) {
  const isViewAll = viewAll && link && sectionName;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-t-gray-dark pt-4 text-sm min-[450px]:flex-nowrap min-[450px]:justify-normal md:justify-end md:gap-5">
      {isViewAll && (
        <Link
          href={link}
          className="btn-tertiary btn-sm 3xl:btn-lg order-last mr-auto basis-full text-center min-[450px]:order-none min-[450px]:basis-auto lg:hidden"
        >
          View All {sectionName}
        </Link>
      )}
      <CarouselPrevious className="static translate-x-0 translate-y-0 lg:order-2" />
      <CarouselNext className="static translate-x-0 translate-y-0 lg:order-3" />
    </div>
  );
}
