import { SVGcomponent } from "@/types";
import { cn } from "@/lib/utils";
import IconContainerSVG from "@/assets/icons/icon-container.svg";

type IconContainerProps = {
  Icon: SVGcomponent;
  className?: string;
};

export function IconContainer({
  Icon,
  className,
  ...props
}: IconContainerProps) {
  return (
    <span className={cn("relative", className)} aria-hidden="true" {...props}>
      <IconContainerSVG className="size-12 animate-[spin_10s_linear]" />
      <Icon className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 !fill-purple-light [&>*]:!fill-purple-light" />
    </span>
  );
}
