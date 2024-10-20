import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SectionProps = HTMLAttributes<HTMLDivElement>;

export function Section({ className, children, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "space-y-10 md:space-y-12 lg:space-y-15 2xl:space-y-20",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
