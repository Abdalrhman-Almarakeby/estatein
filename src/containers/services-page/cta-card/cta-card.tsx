import { Route } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import WavesSVG from "@/assets/abstract-designs/waves-2.svg";

type CTACardProps = {
  title: string;
  link: Route;
  paragraph: string;
  extend?: boolean | undefined;
  className?: string;
};

export function CTACard({
  title,
  paragraph,
  link,
  className,
  extend,
}: CTACardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col justify-center gap-5 rounded-[0.625rem] border bg-gray-darker p-6 lg:p-10 3xl:gap-7.5 3xl:p-12.5",
        className,
      )}
    >
      <WavesSVG className="absolute inset-0 size-full" />
      <div
        className={cn(
          "flex flex-col gap-5",
          extend && "sm:flex-row sm:items-center sm:justify-between",
        )}
      >
        <p
          className={cn(
            "z-10 text-xl font-bold",
            extend ? "lg:text-2xl 3xl:text-3xl" : "lg:[1.375rem] 3xl:text-2xl",
          )}
        >
          {title}
        </p>
        <Link
          href={link}
          className={cn(
            "btn-secondary btn-sm 3xl:btn-lg z-10 text-center",
            !extend && "hidden",
          )}
        >
          Let's Connect
        </Link>
      </div>
      <p className="text-primary z-10">{paragraph}</p>
      <Link
        href={link}
        className={cn(
          "btn-secondary btn-sm 3xl:btn-lg z-10 text-center",
          extend && "hidden",
        )}
      >
        Let's Connect
      </Link>
    </div>
  );
}
