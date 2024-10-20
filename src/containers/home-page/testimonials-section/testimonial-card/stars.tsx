import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type StarsProps = {
  num: number;
  className?: string;
};

export function Stars({ num, className }: StarsProps) {
  return (
    <div className={cn("flex gap-2", className)}>
      {Array.from({ length: Math.min(Math.max(num, 1), 5) }).map((_, index) => (
        <span
          key={index}
          className="grid size-7.5 place-items-center rounded-full border bg-gray-darker lg:size-9"
          role="img"
          aria-label="Star"
        >
          <Star className="size-4 fill-yellow-400 stroke-yellow-400" />
        </span>
      ))}
      <div className="sr-only">{`${num} stars`}</div>
    </div>
  );
}
