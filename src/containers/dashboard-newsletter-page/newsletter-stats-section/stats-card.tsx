import { UsersIcon } from "lucide-react";
import { formatNumberWithLetter } from "@/lib/utils/numbers";
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
    <div className="bg-gray-darker rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-primary">{title}</h3>
        <UsersIcon className="size-5 text-purple-light" />
      </div>
      <div className="text-3xl font-bold ps-2">
        {formatNumberWithLetter(value)}
      </div>
      {!!growth && comparisonText && (
        <p className="text-sm font-normal flex gap-1 items-center mt-4 text-primary">
          <GrowthIndicator value={growth} />
          <span>
            {Math.abs(growth).toFixed(0)}% {comparisonText}
          </span>
        </p>
      )}
    </div>
  );
}
