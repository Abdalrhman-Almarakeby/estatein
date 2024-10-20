import { createElement } from "react";
import { cn } from "@/lib/utils";
import StarsSVG from "@/assets/stars.svg";

type SectionTitleProps = {
  title: string;
  paragraph: string;
  level?: number;
  className?: string;
};

export function SectionTitle({
  title,
  paragraph,
  level = 3,
  className,
}: SectionTitleProps) {
  const headingLevel = Math.min(Math.max(level, 1), 6);
  const headingElement = createElement(
    `h${headingLevel}`,
    { className: "h-primary" },
    title,
  );

  return (
    <div className={cn("relative space-y-1.5 lg:space-y-2.5", className)}>
      <StarsSVG className="absolute -left-2 -translate-y-full lg:h-6" />
      {headingElement}
      <p className="text-primary">{paragraph}</p>
    </div>
  );
}
