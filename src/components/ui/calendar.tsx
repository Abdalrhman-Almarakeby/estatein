"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("rounded-lg bg-gray-darkest p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-white",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          "border border-gray-dark bg-gray-darker text-white",
          "size-8 p-1.5 rounded-md transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
          "disabled:opacity-50",
        ),
        nav_button_previous: "absolute left-2",
        nav_button_next: "absolute right-2",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-gray-medium rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "h-9 w-9 text-center text-sm p-0 relative",
          "[&:has([aria-selected].day-range-end)]:rounded-r-md",
          "[&:has([aria-selected].day-outside)]:bg-gray-darker",
          "[&:has([aria-selected])]:bg-gray-dark",
          "first:[&:has([aria-selected])]:rounded-l-md",
          "last:[&:has([aria-selected])]:rounded-r-md",
          "focus-within:relative focus-within:z-20",
        ),
        day: cn(
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
          "hover:bg-gray-dark hover:text-purple-light rounded-md",
          "text-gray-light transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-base focus-visible:ring-offset-2 focus-visible:ring-offset-gray-darkest",
        ),
        day_range_end: "day-range-end",
        day_selected: cn(
          "bg-purple-base text-white",
          "hover:bg-purple-medium hover:text-white",
          "focus:bg-purple-base focus:text-white",
        ),
        day_today: "bg-gray-darker text-purple-light font-semibold",
        day_outside: cn(
          "day-outside text-gray-medium",
          "aria-selected:bg-gray-darker",
          "aria-selected:text-gray-medium",
        ),
        day_disabled: "text-gray-medium opacity-50",
        day_range_middle:
          "aria-selected:bg-gray-dark aria-selected:text-purple-light",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
