import { Property } from "@prisma/client";
import { Column } from "@tanstack/react-table";

export function useSortableHeader() {
  function toggleSorting(column: Column<Property>) {
    return () => column.toggleSorting(column.getIsSorted() === "asc");
  }

  return { toggleSorting };
}
