import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type PropertyCardSkeletonProps = {
  className?: string;
};

export const PropertyCardSkeleton = forwardRef<
  HTMLDivElement,
  PropertyCardSkeletonProps
>(({ className }, ref) => {
  return (
    <div
      className={cn(
        "flex basis-full flex-col gap-4 rounded-xl border p-5 lg:gap-5 lg:p-7.5",
        className,
      )}
      aria-busy="true"
      ref={ref}
    >
      <div
        className="bg-gray-medium0 aspect-[31/21] animate-pulse rounded-[0.625rem]"
        aria-hidden="true"
      ></div>
      <div className="space-y-5">
        <div className="space-y-1">
          <div
            className="bg-gray-medium0 h-5 w-1/2 animate-pulse rounded-lg"
            aria-hidden="true"
          ></div>
          <div
            className="bg-gray-medium0 h-5 animate-pulse rounded-lg"
            aria-hidden="true"
          ></div>
          <div
            className="bg-gray-medium0 h-5 animate-pulse rounded-lg"
            aria-hidden="true"
          ></div>
        </div>
        <div className="flex flex-wrap gap-1.5 text-sm">
          <div
            className="bg-gray-medium0 h-5 w-32 animate-pulse rounded-3xl"
            aria-hidden="true"
          ></div>
          <div
            className="bg-gray-medium0 h-5 w-32 animate-pulse rounded-3xl"
            aria-hidden="true"
          ></div>
          <div
            className="bg-gray-medium0 h-5 w-12 animate-pulse rounded-3xl"
            aria-hidden="true"
          ></div>
        </div>
        <div className="flex gap-7.5">
          <div className="grid gap-3">
            <span
              className="bg-gray-medium0 h-3 w-15 animate-pulse rounded"
              aria-hidden="true"
            ></span>
            <span
              className="bg-gray-medium0 h-5 w-20 animate-pulse rounded"
              aria-hidden="true"
            ></span>
            <span
              className="bg-gray-medium0 h-5 w-20 animate-pulse rounded"
              aria-hidden="true"
            ></span>
          </div>
          <div
            className="bg-gray-medium0 flex-grow animate-pulse rounded-lg"
            aria-hidden="true"
          ></div>
        </div>
      </div>
    </div>
  );
});

PropertyCardSkeleton.displayName = "PropertyCardSkeleton";
