import { Property } from "@prisma/client";
import { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useSortableHeader } from "./use-sortable-header";

type SortableHeaderProps = { children: string; column: Column<Property> };

export function SortableHeader({ column, children }: SortableHeaderProps) {
  const { toggleSorting } = useSortableHeader();

  return (
    <button
      className="flex items-center gap-x-2"
      onClick={toggleSorting(column)}
    >
      <span>{children}</span>
      <ArrowUpDown className="size-4" />
    </button>
  );
}
