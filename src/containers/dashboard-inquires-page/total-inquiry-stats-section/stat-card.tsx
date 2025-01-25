import { GrowthIndicator } from "@/containers/dashboard-newsletter-page/newsletter-stats-section/growth-indicator";
import { cn } from "@/lib/utils";

type StatCardProps = {
  statName: string;
  statValue: number;
  statIcon: React.ReactNode;
  percentageChange?: number;
  periodComparison?: string;
  isPeriodStat?: boolean;
};

export function StatCard({
  statName,
  statValue,
  statIcon,
  percentageChange,
  periodComparison,
  isPeriodStat,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-gray-darker p-6 shadow",
        isPeriodStat && "border-l-4 border-l-purple-base",
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-light">{statName}</h3>
        <div className="rounded-full bg-gray-darkest p-3 text-purple-base">
          {statIcon}
        </div>
      </div>
      <div className="text-3xl font-bold text-white">
        {statValue.toLocaleString()}
      </div>
      {!!percentageChange && periodComparison && (
        <p className="text-primary mt-4 flex items-center gap-1 text-sm font-normal">
          <GrowthIndicator value={percentageChange} />
          <span>
            {Math.abs(percentageChange).toFixed(0)}% {periodComparison}
          </span>
        </p>
      )}
    </div>
  );
}
