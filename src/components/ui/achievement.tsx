import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type AchievementProps = {
  achievement: string;
  label: string;
  className?: string;
};

export const Achievement = forwardRef<HTMLHeadingElement, AchievementProps>(
  ({ achievement, label, className }, ref) => {
    return (
      <h2
        className={cn(
          "space-y-0.5 rounded-md border bg-gray-darker py-4 sm:col-span-1 xl:space-y-1 xl:px-2",
          className,
        )}
        ref={ref}
      >
        <span className="block text-2xl font-bold xl:text-3xl 3xl:text-4xl">
          {achievement}
        </span>
        <span className="text-primary block xl:text-sm 3xl:text-base">
          {label}
        </span>
      </h2>
    );
  },
);

Achievement.displayName = "Achievement";
