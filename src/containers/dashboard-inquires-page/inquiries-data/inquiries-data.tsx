"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Inquiry,
  PropertyInquiry,
  SpecificPropertyInquiry,
} from "@prisma/client";
import { endOfDay, startOfDay } from "date-fns";
import { DateRange } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/form/select";
import { InquiresType, StrictRequired } from "@/types";
import { DateRangePickerWithPresets } from "./date-range-picker-with-presets";
import { PropertiesTypesTabs } from "./inquires-types-tabs";
import { InquiryDataTable } from "./inquiry-data-table";
import { StatisticsSection } from "./statistics-section";

type InquiriesDataProps = {
  data: {
    general: Inquiry[];
    property: PropertyInquiry[];
    specific: SpecificPropertyInquiry[];
  };
};

export function InquiriesData({ data }: InquiriesDataProps) {
  const [activeTab, setActiveTab] = useState<InquiresType>("general");
  const [dateRange, setDateRange] = useState<StrictRequired<DateRange>>({
    from: startOfDay(new Date()),
    to: endOfDay(new Date()),
  });
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const handleDateRangeChange = useCallback(
    (range: StrictRequired<DateRange>) => {
      setDateRange(range);
    },
    [],
  );

  const filteredData = useMemo(
    () => ({
      ...data,
      [activeTab]: data[activeTab].filter(
        (inquiry) =>
          new Date(inquiry.createdAt) >= dateRange.from &&
          new Date(inquiry.createdAt) <= dateRange.to &&
          (filterStatus === "all" ||
            (inquiry.replied ? "replied" : "pending") === filterStatus),
      ),
    }),
    [data, activeTab, dateRange, filterStatus],
  );

  return (
    <>
      <PropertiesTypesTabs
        activeTab={activeTab}
        setActiveTab={(tab: InquiresType) => setActiveTab(tab)}
      />
      <StatisticsSection data={data} inquiresType={activeTab} />

      <div className="mt-6 space-y-6 rounded-lg bg-gray-darker p-6 shadow">
        <h2 className="text-2xl font-semibold">Inquiry List</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <fieldset className="space-y-2.5 lg:space-y-4">
            <label htmlFor="date-filter">Date Range</label>
            <DateRangePickerWithPresets
              onDateRangeChange={handleDateRangeChange}
              id="date-filter"
            />
          </fieldset>
          <fieldset className="space-y-2.5 lg:space-y-4">
            <label htmlFor="status-filter">Status</label>
            <Select
              onValueChange={(value) => setFilterStatus(value)}
              value={filterStatus}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="replied">Replied</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </fieldset>
        </div>
        <InquiryDataTable
          inquiries={filteredData[activeTab]}
          type={activeTab}
        />
      </div>
    </>
  );
}
