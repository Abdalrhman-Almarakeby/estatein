"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { LOCATIONS, LOCATIONS_TYPE } from "@/constant";
import { LocationCard } from "./location-card";

export function OfficeLocations() {
  const searchParams = useSearchParams();

  const locationsType = searchParams.get("locationsType");

  const currentLocationsType =
    locationsType &&
    (LOCATIONS_TYPE as ReadonlyArray<string>).includes(locationsType)
      ? locationsType
      : "all";

  const filteredLocations =
    currentLocationsType === "all"
      ? LOCATIONS
      : LOCATIONS.filter((location) => location.type === currentLocationsType);
  return (
    <div className="flex flex-col gap-7.5 lg:gap-10 3xl:gap-15">
      <div
        role="tablist"
        className="grid grid-cols-2 gap-2.5 rounded-[0.625rem] bg-gray-darker p-2.5 min-[450px]:grid-cols-3 lg:self-start"
      >
        {LOCATIONS_TYPE.map((locationType) => (
          <Link
            scroll={false}
            href={`?locationsType=${locationType}`}
            key={locationType}
            role="tab"
            aria-selected={currentLocationsType === locationType}
            aria-label={`Show ${locationType} locations`}
            className={cn(
              "btn-sm 3xl:btn-lg text-center capitalize first:col-span-2 min-[450px]:first:col-span-1 lg:px-9 3xl:px-16",
              currentLocationsType === locationType
                ? "btn-secondary"
                : "btn-tertiary",
            )}
          >
            {locationType}
          </Link>
        ))}
      </div>
      <div
        role="tabpanel"
        className="grid gap-5 lg:grid-cols-2 lg:gap-5 3xl:gap-7.5"
      >
        {filteredLocations.map((location) => (
          <LocationCard key={location.label} {...location} />
        ))}
      </div>
    </div>
  );
}
