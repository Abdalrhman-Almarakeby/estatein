import { StatsCard } from "./stats-card";

type TimeFrame = "day" | "week" | "month" | "total";

type SubscriberData = {
  count: number;
  growth?: number;
};

export type NewsletterStatsData = Record<TimeFrame, SubscriberData>;

type NewsletterStatsProps = {
  stats: NewsletterStatsData;
};

const timeFrameTitles: Record<TimeFrame, string> = {
  day: "Last 24 Hours",
  week: "Last 7 Days",
  month: "Last 30 Days",
  total: "Total Subscribers",
};

const timeFrameComparisons: Record<TimeFrame, string> = {
  day: "from yesterday",
  week: "from last week",
  month: "from last month",
  total: "",
};

export function NewsletterStats({ stats }: NewsletterStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {(Object.keys(stats) as TimeFrame[]).map((timeFrame) => (
        <StatsCard
          key={timeFrame}
          title={timeFrameTitles[timeFrame]}
          value={stats[timeFrame].count}
          growth={stats[timeFrame].growth}
          comparisonText={timeFrameComparisons[timeFrame]}
        />
      ))}
    </div>
  );
}
