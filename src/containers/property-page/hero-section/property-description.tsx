import { Bath, BedDouble, Grid2x2 } from "lucide-react";
import { formatTwoDigits, formatWithComma } from "@/lib/utils";

type PropertyDescriptionProps = {
  description: string;
  bathrooms: number;
  bedrooms: number;
  area: number;
};

export function PropertyDescription({
  description,
  bedrooms,
  bathrooms,
  area,
}: PropertyDescriptionProps) {
  return (
    <div className="space-y-5 rounded-[10px] border p-5 sm:space-y-7.5 sm:p-7.5 xl:space-y-10 xl:self-start xl:p-10 3xl:space-y-12.5 3xl:p-12.5">
      <div className="space-y-1.5 sm:space-y-2 lg:space-y-2.5 2xl:space-y-3.5">
        <h3 className="text-lg font-semibold sm:text-xl lg:text-[1.375rem] 2xl:text-2xl">
          Description
        </h3>
        <p className="text-primary">{description}</p>
      </div>
      <div className="grid gap-5 border-t pt-5 sm:grid-cols-3">
        <div className="grid grid-cols-2 gap-5 text-sm text-gray-light sm:col-span-2">
          <p className="grid gap-2 border-r">
            <span className="flex items-center gap-1">
              <BedDouble />
              Bedrooms
            </span>
            <span className="text-lg text-white">
              {formatTwoDigits(bedrooms)}
            </span>
          </p>

          <p className="grid gap-2 sm:border-r">
            <span className="flex items-center gap-1">
              <Bath />
              Bathrooms
            </span>
            <span className="text-lg text-white">
              {formatTwoDigits(bathrooms)}
            </span>
          </p>
        </div>

        <hr className="sm:hidden" />

        <p className="grid gap-2">
          <span className="flex items-center gap-1 text-sm text-gray-light">
            <Grid2x2 />
            Area
          </span>
          <span className="text-lg text-white">
            {formatWithComma(area)} ft²
          </span>
        </p>
      </div>
    </div>
  );
}
