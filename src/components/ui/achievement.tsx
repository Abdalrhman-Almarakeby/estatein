import { cn } from "@/lib/utils";

type AchievementProps = {
  achievement: string;
  label: string;
  className?: string;
};

export function Achievement({
  achievement,
  label,
  className,
}: AchievementProps) {
  return (
    <h2
      className={cn(
        "space-y-0.5 rounded-md border bg-gray-darker py-4 sm:col-span-1 xl:space-y-1 xl:px-2",
        className,
      )}
    >
      <span className="block text-2xl font-bold xl:text-3xl 3xl:text-4xl">
        {achievement}
      </span>
      <span className="text-primary block xl:text-sm 3xl:text-base">
        {label}
      </span>
    </h2>
  );
}
