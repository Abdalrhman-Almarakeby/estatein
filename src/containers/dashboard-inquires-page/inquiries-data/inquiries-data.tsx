"use client";

import { useCallback, useState } from "react";
import {
  Inquiry,
  PropertyInquiry,
  SpecificPropertyInquiry,
} from "@prisma/client";
import { endOfDay, startOfDay } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/form/select";
import { InquiresType } from "@/types";
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
  // TODO:
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>({
    start: startOfDay(new Date()),
    end: endOfDay(new Date()),
  });
  const [filterStatus, setFilterStatus] = useState<string>("");

  const handleDateRangeChange = useCallback(
    (range: { from: Date; to: Date }) => {
      setDateRange({ start: range.from, end: range.to });
    },
    [],
  );

  // TODO
  const filteredData = data;
  // const filteredData = useMemo(
  //   () => ({
  //     ...data,
  //     [activeTab]: data[activeTab].filter(
  //       (inquiry) =>
  //         new Date(inquiry.createdAt) >= dateRange.start &&
  //         new Date(inquiry.createdAt) <= dateRange.end &&
  //         (filterStatus === "all" ||
  //           (inquiry.replied ? "replied" : "pending") === filterStatus),
  //     ),
  //   }),
  //   [data, activeTab, dateRange, filterStatus],
  // );

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
          <div>
            <label className="text-gr mb-1 block text-sm font-medium">
              Date Range
            </label>
            <DateRangePickerWithPresets
              onDateRangeChange={handleDateRangeChange}
            />
          </div>
          <div>
            <label
              htmlFor="status-filter"
              className="mb-1 block text-sm font-medium"
            >
              Status
            </label>
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
          </div>
        </div>
        <InquiryDataTable
          inquiries={filteredData[activeTab]}
          type={activeTab}
        />
      </div>
    </>
  );
}
