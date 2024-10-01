import Link from "next/link";
import { Fragment } from "react";
import { cn, formatPrice } from "@/lib/utils";

type PriceDetailsProps = {
  title: string;
  data: {
    label: string;
    value: number | string;
    description?: string;
  }[];
  className?: string;
};

export function PriceDetails({ title, data, className }: PriceDetailsProps) {
  return (
    <div
      className={cn(
        "grid gap-5 rounded-xl border p-5 sm:gap-7.5 sm:p-7.5 md:p-10 xl:p-12.5 2xl:grid-cols-2 2xl:gap-20",
        className,
      )}
    >
      <div className="flex flex-col items-start justify-between gap-3 xs:flex-row xs:items-center 2xl:col-span-2">
        <h3 className="text-lg font-semibold sm:text-3xl">{title}</h3>
        <Link href="#inquire" className="btn-tertiary btn-sm">
          Learn More
        </Link>
      </div>
      <hr className="2xl:hidden" />
      {data.map(({ label, value, description }) => (
        <Fragment key={label}>
          <div className="space-y-2.5 sm:space-y-3 xl:space-y-5">
            <p className="text-primary">{label}</p>
            <div className="flex flex-col gap-3 xs:flex-row xs:items-center xl:gap-5">
              <p className="text-lg font-semibold sm:text-xl xl:text-2xl">
                {typeof value === "number" ? formatPrice(value) : value}
              </p>
              {description && (
                <p className="text-primary rounded-md border bg-gray-darker px-3 py-1.5">
                  {description}
                </p>
              )}
            </div>
          </div>
          <hr className="last:hidden 2xl:hidden" />
        </Fragment>
      ))}
    </div>
  );
}
