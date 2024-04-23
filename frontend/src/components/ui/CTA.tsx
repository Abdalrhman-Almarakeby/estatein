import { Link } from "react-router-dom";
import GridDesign1SVG from "@/assets/abstractDesigns/grid-1.svg?react";
import GridDesign2SVG from "@/assets/abstractDesigns/grid-2.svg?react";

export function CTA() {
  return (
    <section className="mx-break-out px-break-out relative flex flex-col gap-12.5 overflow-hidden py-12.5 3xl:container lg:flex-row lg:items-center lg:justify-between">
      <div className="z-10 flex flex-col gap-1.5 md:gap-2.5 lg:grow xl:gap-5">
        <p className="text-[1.75rem] font-medium md:text-3xl xl:text-[2.375rem] 3xl:text-5xl">
          Start Your Real Estate Journey Today
        </p>
        <p className="text-sm leading-normal text-gray-60 md:text-base xl:text-lg">
          Your dream property is just a click away. Whether you're looking for a new home, a
          strategic investment, or expert real estate advice, Estatein is here to assist you every
          step of the way. Take the first step towards your real estate goals and explore our
          available properties or get in touch with our team for personalized assistance.
        </p>
      </div>
      <Link
        to="/properties"
        className="z-10 rounded-lg bg-purple-60 px-5 py-3.5 text-center text-sm md:text-base 3xl:px-6 3xl:py-4.5 3xl:text-lg"
      >
        Explore Properties
      </Link>
      <GridDesign1SVG className="absolute left-0 top-0" />
      <GridDesign2SVG className="absolute bottom-0 right-0" />
    </section>
  );
}