import { forwardRef } from "react";
import { SVGcomponent } from "@/types";
import { cn } from "@/lib/utils";
import IconContainerSVG from "@/assets/icons/icon-container.svg";

type IconContainerProps = {
  Icon: SVGcomponent;
  className?: string;
};

export const IconContainer = forwardRef<HTMLSpanElement, IconContainerProps>(
  ({ Icon, className, ...props }, ref) => {
    return (
      <span
        className={cn("relative", className)}
        aria-hidden="true"
        ref={ref}
        {...props}
      >
        <IconContainerSVG className="size-12 animate-[spin_10s_linear]" />
        <Icon className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 !fill-purple-light [&>*]:!fill-purple-light" />
      </span>
    );
  },
);

IconContainer.displayName = "IconContainer";
