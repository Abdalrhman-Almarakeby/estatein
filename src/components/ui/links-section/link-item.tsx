import { IconContainer } from "@/components/ui/icon-container";
import { SVGcomponent } from "@/types";
import { ArrowUpRight } from "lucide-react";
import { Route } from "next";
import Link from "next/link";
import { HTMLAttributeAnchorTarget } from "react";

type LinkItemProps = {
  to: Route;
  Icon: SVGcomponent;
  label: string;
  target?: HTMLAttributeAnchorTarget;
  ariaLabel?: string;
};

export const LinkItem = ({
  to,
  Icon,
  label,
  target,
  ariaLabel,
}: LinkItemProps) => {
  return (
    <Link
      target={target}
      aria-label={ariaLabel || label}
      href={to}
      className="relative flex flex-col items-center justify-center gap-3.5 rounded-[10px] border bg-gray-darker px-4 py-5"
    >
      <IconContainer Icon={Icon} />
      <p className="text-center text-sm font-medium sm:text-base">{label}</p>
      <ArrowUpRight 
        className="absolute right-3 top-4 size-5 stroke-gray-medium lg:right-5 lg:top-6"
        role="img"
        aria-hidden="true"
      />
    </Link>
  );
};

LinkItem.displayName = "LinkItem";
