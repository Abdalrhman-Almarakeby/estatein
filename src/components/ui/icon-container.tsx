import { SVGProps } from "react";
import { SVGcomponent } from "@/types";
import { cn, omit } from "@/lib/utils";
import IconContainerSVG from "@/assets/icon-container.svg";

type IconContainerProps = {
  Icon: SVGcomponent;
  iconProps?: SVGProps<SVGSVGElement>;
  className?: string;
};

export function IconContainer({
  Icon,
  className,
  iconProps,
  ...props
}: IconContainerProps) {
  return (
    <span className={cn("relative", className)} aria-hidden="true" {...props}>
      <IconContainerSVG className="size-12 animate-[spin_10s_linear]" />
      <Icon
        {...(iconProps ? { ...omit(iconProps, "className") } : {})}
        className={cn(
          "absolute right-1/2 top-1/2 size-5 -translate-y-1/2 translate-x-1/2 stroke-purple-light",
          iconProps?.className,
        )}
      />
    </span>
  );
}
