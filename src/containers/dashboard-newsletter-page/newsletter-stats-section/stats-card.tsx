import { UsersIcon } from "lucide-react";
import { formatCompactNumber } from "@/lib/utils";
import { GrowthIndicator } from "./growth-indicator";

type StatsCardProps = {
  title: string;
  value: number;
  growth?: number;
  comparisonText: string;
};

export function StatsCard({
  title,
  value,
  growth,
  comparisonText,
}: StatsCardProps) {
  return (
    <div className="rounded-lg bg-gray-darker p-6 shadow">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-primary">{title}</h3>
        <UsersIcon className="size-5 text-purple-light" />
      </div>
      <div className="ps-2 text-3xl font-bold">
        {formatCompactNumber(value)}
      </div>
      {!!growth && comparisonText && (
        <p className="text-primary mt-4 flex items-center gap-1 text-sm font-normal">
          <GrowthIndicator value={growth} />
          <span>
            {Math.abs(growth).toFixed(0)}% {comparisonText}
          </span>
        </p>
      )}
    </div>
  );
}
