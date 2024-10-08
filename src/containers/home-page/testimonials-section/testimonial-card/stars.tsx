import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import StarSVG from "@/assets/icons/star.svg";

type StarsProps = {
  num: number;
  className?: string;
};

export const Stars = forwardRef<HTMLDivElement, StarsProps>(
  ({ num, className }, ref) => {
    return (
      <div className={cn("flex gap-2", className)} ref={ref}>
        {Array.from({ length: num }).map((_, index) => (
          <span
            key={index}
            className="grid size-7.5 place-items-center rounded-full border bg-gray-darker lg:size-9"
            role="img"
            aria-label="Star"
          >
            <StarSVG />
          </span>
        ))}
        <div className="sr-only">{`${num} stars`}</div>
      </div>
    );
  },
);

Stars.displayName = "Stars";
