import { Link } from "react-router-dom";
import IconContainerSVG from "@/assets/icons/icon-container.svg?react";
import DiagonalArrowIconSVG from "@/assets/icons/diagonal-arrow.svg?react";

type LinkData = {
  to: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  label: string;
  className?: string;
};

type LinksSectionProps = {
  linksData: readonly LinkData[];
};

export function LinksSection({ linksData }: LinksSectionProps) {
  return (
    <section className="grid grid-cols-2 gap-2.5 rounded-xl border border-gray-15 bg-gray-08 p-2.5 shadow-[#191919_0px_0px_0px_5px] lg:mx-break-out min-[1700px]:container md:col-span-2 lg:order-5 lg:grid-cols-4 min-[1700px]:!p-2.5">
      {linksData.map(({ to, Icon, label }) => (
        <Link
          key={label}
          to={to}
          className="relative flex flex-col items-center justify-center gap-3.5 rounded-[10px] border border-gray-15 bg-gray-10 px-4 py-5"
        >
          <span className="relative" aria-hidden="true">
            <IconContainerSVG className="animate-spin duration-10s" />
            <Icon className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2" />
          </span>
          <p className="text-center text-sm font-medium sm:text-base">{label}</p>
          <DiagonalArrowIconSVG
            className="absolute right-3 top-4 size-5 stroke-gray-30 lg:right-5 lg:top-6"
            role="img"
            aria-hidden="true"
          />
        </Link>
      ))}
    </section>
  );
}
