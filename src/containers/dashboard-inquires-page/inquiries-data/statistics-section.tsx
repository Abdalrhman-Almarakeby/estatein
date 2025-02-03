"use client";

import {
  Inquiry,
  PropertyInquiry,
  SpecificPropertyInquiry,
} from "@prisma/client";
import { AlertCircle, CheckCircle, MessageSquare } from "lucide-react";
import { GrowthIndicator } from "@/containers/dashboard-newsletter-page/newsletter-stats-section/growth-indicator";
import { InquiryType } from "@/types";
import { cn, upperFirst } from "@/lib/utils";

type StatisticsSectionProps = {
  inquiresType: InquiryType;
  data: {
    general: Inquiry[];
    property: PropertyInquiry[];
    specific: SpecificPropertyInquiry[];
  };
};

export function StatisticsSection({
  data,
  inquiresType,
}: StatisticsSectionProps) {
  const activeRepliedInquiries = data[inquiresType].filter(
    (i) => i.replied,
  ).length;
  const activePendingInquiries =
    data[inquiresType].length - activeRepliedInquiries;

  const lastDay = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const lastMonth = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const inquiriesLastDay = countInquiriesSince(data[inquiresType], lastDay);
  const inquiriesLastWeek = countInquiriesSince(data[inquiresType], lastWeek);
  const inquiriesLastMonth = countInquiriesSince(data[inquiresType], lastMonth);

  const dayChange = percentChange(
    inquiriesLastDay,
    countInquiriesSince(
      data[inquiresType],
      new Date(lastDay.getTime() - 24 * 60 * 60 * 1000),
    ),
  );
  const weekChange = percentChange(
    inquiriesLastWeek,
    countInquiriesSince(
      data[inquiresType],
      new Date(lastWeek.getTime() - 7 * 24 * 60 * 60 * 1000),
    ),
  );
  const monthChange = percentChange(
    inquiriesLastMonth,
    countInquiriesSince(
      data[inquiresType],
      new Date(lastMonth.getTime() - 30 * 24 * 60 * 60 * 1000),
    ),
  );

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title={`${upperFirst(inquiresType)} Inquires Inquiries`}
        value={data[inquiresType].length}
        icon={<MessageSquare className="size-5" />}
      />
      <StatCard
        title={`${upperFirst(inquiresType)} Inquires Replied`}
        value={activeRepliedInquiries}
        icon={<CheckCircle className="size-5 text-green-500" />}
      />
      <StatCard
        title={`${upperFirst(inquiresType)} Inquires Pending`}
        value={activePendingInquiries}
        icon={<AlertCircle className="size-5 text-yellow-500" />}
        className="md:col-span-2 lg:col-span-1"
      />
      <div className="col-span-full rounded-lg bg-gray-darker p-6 shadow">
        <h3 className="mb-4 text-lg font-medium text-white">
          Recent {upperFirst(inquiresType)} Inquiries changes
        </h3>
        <div className="space-y-4">
          <RecentStat
            label="Last 24 hours"
            value={inquiriesLastDay}
            change={dayChange}
          />
          <RecentStat
            label="Last 7 days"
            value={inquiriesLastWeek}
            change={weekChange}
          />
          <RecentStat
            label="Last 30 days"
            value={inquiriesLastMonth}
            change={monthChange}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  className,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg bg-gray-darker p-6 shadow", className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-medium text-gray-light">{title}</h3>
        <div className="rounded-full bg-gray-darkest p-2 text-purple-base">
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold text-white">
        {value.toLocaleString()}
      </div>
    </div>
  );
}

function RecentStat({
  label,
  value,
  change,
}: {
  label: string;
  value: number;
  change: number;
}) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-light">{label}</p>
      <div className="flex min-w-20 items-center gap-2">
        <span className="text-lg font-semibold">{value}</span>
        {!!change && (
          <p className="text-primary flex items-center gap-1 text-sm font-normal">
            <GrowthIndicator value={change} />
            <span>{Math.abs(change).toFixed(0)}%</span>
          </p>
        )}
      </div>
    </div>
  );
}

function countInquiriesSince(
  inquiries: Inquiry[] | PropertyInquiry[] | SpecificPropertyInquiry[],
  date: Date,
): number {
  return inquiries.filter((inquiry) => new Date(inquiry.createdAt) >= date)
    .length;
}

function percentChange(current: number, previous: number) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}
