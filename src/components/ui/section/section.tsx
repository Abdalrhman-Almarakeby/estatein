import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SectionProps = HTMLAttributes<HTMLDivElement>;

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <section
        className={cn(
          "space-y-10 md:space-y-12 lg:space-y-15 2xl:space-y-20",
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </section>
    );
  },
);

Section.displayName = "Section";
