"use client";

import { Property } from "@prisma/client";
import { Table } from "@tanstack/react-table";
import { scrollToTop } from "@/lib/scroll";

type PaginationControlsProps = { table: Table<Property> };

export function PaginationControls({ table }: PaginationControlsProps) {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <span className="text-sm ">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </span>
      <button
        className="btn btn-sm btn-secondary py-2"
        onClick={() => {
          table.previousPage();
          scrollToTop();
        }}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </button>
      <button
        className="btn btn-sm btn-secondary py-2"
        onClick={() => {
          table.nextPage();
          scrollToTop();
        }}
        disabled={!table.getCanNextPage()}
      >
        Next
      </button>
    </div>
  );
}
