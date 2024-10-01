import { Route } from "next";
import { forwardRef } from "react";
import { SVGcomponent } from "@/types";
import { cn } from "@/lib/utils";
import { LinkItem } from "./link-item";

type LinkData = {
  to: Route;
  Icon: SVGcomponent;
  label: string;
  target?: React.HTMLAttributeAnchorTarget;
  ariaLabel?: string;
};

type LinksSectionProps = {
  linksData: readonly LinkData[];
  className?: string;
};

export const LinksSection = forwardRef<HTMLDivElement, LinksSectionProps>(
  ({ linksData, className }, ref) => {
    return (
      <section
        className={cn(
          "mx-break-out px-break-out grid grid-cols-2 gap-2.5 rounded-xl border bg-gray-darkest p-2.5 shadow-[#191919_0px_0px_0px_5px] min-[1700px]:container md:col-span-2 lg:order-5 lg:grid-cols-4 min-[1700px]:!p-2.5",
          className,
        )}
        ref={ref}
        role="navigation"
      >
        {linksData.map(({ to, Icon, label, target, ariaLabel }) => (
          <LinkItem
            key={label}
            to={to}
            Icon={Icon}
            label={label}
            target={target}
            ariaLabel={ariaLabel}
          />
        ))}
      </section>
    );
  },
);

LinksSection.displayName = "LinksSection";
