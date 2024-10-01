import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type HeaderSectionProps = {
  title: string;
  paragraph: string;
  className?: string;
};

export const HeaderSection = forwardRef<HTMLDivElement, HeaderSectionProps>(
  ({ title, paragraph, className }, ref) => {
    return (
      <section
        className={cn(
          "mx-break-out px-break-out bg-gradient-to-l from-transparent from-55% to-gray-dark",
          className,
        )}
        ref={ref}
        role="banner"
        aria-labelledby="header-title"
      >
        <div className="container space-y-2.5 py-12.5 lg:py-24 3xl:space-y-3.5 3xl:py-36">
          <h1 id="header-title" className="h-primary">
            {title}
          </h1>
          <p className="text-primary">{paragraph}</p>
        </div>
      </section>
    );
  },
);

HeaderSection.displayName = "HeaderSection";
