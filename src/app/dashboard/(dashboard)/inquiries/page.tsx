import {
  Inquiry,
  PropertyInquiry,
  SpecificPropertyInquiry,
} from "@prisma/client";
import { InquiriesData } from "@/containers/dashboard-inquires-page/inquiries-data";
import { TotalInquiryStatsSection } from "@/containers/dashboard-inquires-page/total-inquiry-stats-section";
import { calculateGrowthPercent } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export default async function Page() {
  const [general, property, specific] = await Promise.all([
    prisma.inquiry.findMany(),
    prisma.propertyInquiry.findMany(),
    prisma.specificPropertyInquiry.findMany(),
  ]);

  const data = {
    general,
    property,
    specific,
  };

  function countInquiriesSince(
    data: {
      general: Inquiry[];
      property: PropertyInquiry[];
      specific: SpecificPropertyInquiry[];
    },
    date: Date,
  ): number {
    return (
      data.general.filter((i) => new Date(i.createdAt) >= date).length +
      data.property.filter((i) => new Date(i.createdAt) >= date).length +
      data.specific.filter((i) => new Date(i.createdAt) >= date).length
    );
  }

  const totalInquiries = general.length + property.length + specific.length;

  const totalRepliedInquiries =
    general.filter((i) => i.replied).length +
    property.filter((i) => i.replied).length +
    specific.filter((i) => i.replied).length;

  const totalPendingInquiries = totalInquiries - totalRepliedInquiries;

  const lastDay = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const lastMonth = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const recentTotalInquiries24h = countInquiriesSince(data, lastDay);
  const recentTotalInquiriesWeek = countInquiriesSince(data, lastWeek);
  const recentTotalInquiriesMonth = countInquiriesSince(data, lastMonth);

  const growthPercent24h = calculateGrowthPercent(
    recentTotalInquiries24h,
    countInquiriesSince(
      data,
      new Date(lastDay.getTime() - 24 * 60 * 60 * 1000),
    ),
  );
  const growthPercentWeek = calculateGrowthPercent(
    recentTotalInquiriesWeek,
    countInquiriesSince(
      data,
      new Date(lastWeek.getTime() - 7 * 24 * 60 * 60 * 1000),
    ),
  );
  const growthPercentMonth = calculateGrowthPercent(
    recentTotalInquiriesMonth,
    countInquiriesSince(
      data,
      new Date(lastMonth.getTime() - 30 * 24 * 60 * 60 * 1000),
    ),
  );

  return (
    <div className="container min-h-screen py-12">
      <h1 className="mb-12 text-3xl font-bold">Inquiries</h1>

      <TotalInquiryStatsSection
        stats={{
          inquiriesTotal: totalInquiries,
          inquiriesResponded: totalRepliedInquiries,
          inquiriesAwaitingResponse: totalPendingInquiries,
          inquiriesDaily: recentTotalInquiries24h,
          inquiriesWeekly: recentTotalInquiriesWeek,
          inquiriesMonthly: recentTotalInquiriesMonth,
          growthRateDaily: growthPercent24h,
          growthRateWeekly: growthPercentWeek,
          growthRateMonthly: growthPercentMonth,
        }}
      />

      <InquiriesData data={data} />
    </div>
  );
}
