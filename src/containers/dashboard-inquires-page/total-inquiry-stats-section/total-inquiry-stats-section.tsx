import { AlertCircle, CheckCircle, Clock, MessageSquare } from "lucide-react";
import { StatCard } from "./stat-card";

type TotalInquiryStats = {
  inquiriesTotal: number;
  inquiriesResponded: number;
  inquiriesAwaitingResponse: number;
  inquiriesDaily: number;
  inquiriesWeekly: number;
  inquiriesMonthly: number;
  growthRateDaily: number;
  growthRateWeekly: number;
  growthRateMonthly: number;
};

type TotalInquiryStatsSectionProps = {
  stats: TotalInquiryStats;
};

export function TotalInquiryStatsSection({
  stats: {
    inquiriesTotal,
    inquiriesResponded,
    inquiriesAwaitingResponse,
    inquiriesDaily,
    inquiriesWeekly,
    inquiriesMonthly,
    growthRateDaily,
    growthRateWeekly,
    growthRateMonthly,
  },
}: TotalInquiryStatsSectionProps) {
  return (
    <div className="mb-8 grid gap-6">
      <div className="grid gap-6 md:grid-cols-2 md:first:*:col-span-2 xl:grid-cols-3 xl:first:*:col-span-1">
        <StatCard
          statName="Total Inquiries"
          statValue={inquiriesTotal}
          statIcon={<MessageSquare className="size-6" />}
        />
        <StatCard
          statName="Responded"
          statValue={inquiriesResponded}
          statIcon={<CheckCircle className="size-6 text-green-500" />}
        />
        <StatCard
          statName="Awaiting Response"
          statValue={inquiriesAwaitingResponse}
          statIcon={<AlertCircle className="size-6 text-yellow-500" />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 md:first:*:col-span-2 xl:grid-cols-3 xl:first:*:col-span-1">
        <StatCard
          statName="Last 24 Hours"
          statValue={inquiriesDaily}
          statIcon={<Clock className="size-6" />}
          percentageChange={growthRateDaily}
          periodComparison="from previous day"
          isPeriodStat
        />
        <StatCard
          statName="Last 7 Days"
          statValue={inquiriesWeekly}
          statIcon={<Clock className="size-6" />}
          percentageChange={growthRateWeekly}
          periodComparison="from previous week"
          isPeriodStat
        />
        <StatCard
          statName="Last 30 Days"
          statValue={inquiriesMonthly}
          statIcon={<Clock className="size-6" />}
          percentageChange={growthRateMonthly}
          periodComparison="from previous month"
          isPeriodStat
        />
      </div>
    </div>
  );
}
