"use client";

import { HTMLAttributes, useEffect, useState } from "react";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
} from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/form/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function DateRangePickerWithPresets({
  className,
  onDateRangeChange,
}: HTMLAttributes<HTMLDivElement> & {
  onDateRangeChange: (range: { from: Date; to: Date }) => void;
}) {
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  useEffect(() => {
    if (date?.from && date?.to) {
      onDateRangeChange({ from: date.from, to: date.to });
    }
  }, [date, onDateRangeChange]);

  const handlePresetChange = (value: string) => {
    const today = new Date();
    switch (value) {
      case "today":
        setDate({ from: startOfDay(today), to: endOfDay(today) });
        break;
      case "yesterday":
        const yesterday = subDays(today, 1);
        setDate({ from: startOfDay(yesterday), to: endOfDay(yesterday) });
        break;
      case "last7days":
        setDate({ from: startOfDay(subDays(today, 6)), to: endOfDay(today) });
        break;
      case "last30days":
        setDate({ from: startOfDay(subDays(today, 29)), to: endOfDay(today) });
        break;
      case "thisweek":
        setDate({ from: startOfWeek(today), to: endOfWeek(today) });
        break;
      case "thismonth":
        setDate({ from: startOfMonth(today), to: endOfMonth(today) });
        break;
      case "alltime":
        setDate({ from: new Date(1970, 0, 1), to: endOfDay(today) });
        break;
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <button
            id="date"
            className={cn(
              "flex h-10 w-full items-center gap-2 rounded-lg border bg-gray-darker px-5 text-sm",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "w-[300px] justify-start text-left font-normal",
              !date && "text-gray-light",
            )}
          >
            <CalendarIcon className="size-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto rounded-lg bg-gray-darkest p-0"
          align="start"
        >
          <Select onValueChange={handlePresetChange}>
            <SelectTrigger className="rounded-lg bg-gray-darker px-5 text-gray-medium">
              <SelectValue placeholder="Select a preset" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="last7days">Last 7 days</SelectItem>
              <SelectItem value="last30days">Last 30 days</SelectItem>
              <SelectItem value="thisweek">This week</SelectItem>
              <SelectItem value="thismonth">This month</SelectItem>
              <SelectItem value="alltime">All time</SelectItem>
            </SelectContent>
          </Select>
          <div className="border-t border-gray-dark">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              showOutsideDays={false}
              className="rounded-lg bg-gray-darkest"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
