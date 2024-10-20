import Link from "next/link";
import { cn } from "@/lib/utils";
import GridDesign1SVG from "@/assets/abstract-designs/grid-1.svg";
import GridDesign2SVG from "@/assets/abstract-designs/grid-2.svg";

type CTAProps = {
  className?: string;
};

export function CTA({ className }: CTAProps) {
  return (
    <section
      className={cn(
        "mx-break-out px-break-out relative flex flex-col gap-12.5 overflow-hidden py-12.5 3xl:container lg:flex-row lg:items-center lg:justify-between 3xl:rounded-md",
        className,
      )}
      aria-labelledby="cta-heading"
      role="region"
    >
      <div className="z-10 flex flex-col gap-1.5 md:gap-2.5 lg:grow xl:gap-5">
        <h2 id="cta-heading" className="h-primary">
          Start Your Real Estate Journey Today
        </h2>
        <p className="text-primary">
          Your dream property is just a click away. Whether you're looking for a
          new home, a strategic investment, or expert real estate advice,
          Estatein is here to assist you every step of the way. Take the first
          step towards your real estate goals and explore our available
          properties or get in touch with our team for personalized assistance.
        </p>
      </div>
      <Link
        href="/properties#"
        className="btn-primary btn-sm 3xl:btn-lg z-10 whitespace-nowrap text-center"
      >
        Explore Properties
      </Link>
      <GridDesign1SVG className="absolute left-0 top-0" aria-hidden="true" />
      <GridDesign2SVG
        className="absolute bottom-0 right-0"
        aria-hidden="true"
      />
    </section>
  );
}
