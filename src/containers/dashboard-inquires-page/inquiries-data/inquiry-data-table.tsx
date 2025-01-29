"use client";

import { useState } from "react";
import {
  Inquiry,
  PropertyInquiry,
  SpecificPropertyInquiry,
} from "@prisma/client";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import {
  ArrowUpDown,
  Copy,
  Download,
  Eye,
  MessageCircle,
  MoreHorizontal,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginationControls } from "@/containers/dashboard-properties-page/properties-table/pagination-controls";
import { InquiresType } from "@/types";
import { InquiryDetails } from "./inquiry-details";

type InquiryDataTableProps = {
  inquiries: (Inquiry | PropertyInquiry | SpecificPropertyInquiry)[];
  type: InquiresType;
};

export function InquiryDataTable({ inquiries, type }: InquiryDataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [model, setModel] = useState<{
    isOpen: boolean;
    data: (Inquiry | PropertyInquiry | SpecificPropertyInquiry) | null;
  }>({
    isOpen: false,
    data: null,
  });

  const columns: ColumnDef<
    Inquiry | PropertyInquiry | SpecificPropertyInquiry
  >[] = [
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center text-left font-medium"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </button>
        );
      },
      cell: ({ row }) =>
        format(new Date(row.getValue("createdAt")), "MMM d, yyyy 'at' h:mm a"),
    },
    {
      accessorKey: "firstName",
      header: "Name",
      cell: ({ row }) =>
        `${row.getValue("firstName")} ${row.original.lastName}`,
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "replied",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`rounded-full px-2 py-1 text-xs ${
            row.getValue("replied")
              ? "bg-green-200 text-green-800"
              : "bg-yellow-200 text-yellow-800"
          }`}
        >
          {row.getValue("replied") ? "Replied" : "Pending"}
        </span>
      ),
    },
    {
      id: "details",
      header: "Details",
      cell: ({ row }) => (
        <button
          onClick={() =>
            setModel({
              isOpen: true,
              data: row.original,
            })
          }
          className="btn-primary flex items-center gap-1 px-2 py-2"
        >
          <Eye className="size-4" />
          View Details
        </button>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        // TODO:
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex h-8 w-8 items-center justify-center p-0 text-gray-400 hover:text-gray-600 focus:outline-none">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleStatusChange(row.original)}>
              <MessageCircle className="mr-2 h-4 w-4" />
              {row.original.replied ? "Mark as Pending" : "Mark as Replied"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => copyToClipboard(row.original.email)}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Email
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                copyToClipboard(
                  `${row.original.firstName} ${row.original.lastName}`,
                )
              }
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Name
            </DropdownMenuItem>
            {type === "specific" && (
              <DropdownMenuItem
                onClick={() =>
                  copyToClipboard(
                    (row.original as SpecificPropertyInquiry).propertyId,
                  )
                }
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy Property ID
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => downloadInquiryDetails(row.original)}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data: inquiries,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  const handleStatusChange = (
    inquiry: Inquiry | PropertyInquiry | SpecificPropertyInquiry,
  ) => {
    inquiry.replied = !inquiry.replied;
  };

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <PaginationControls table={table} />
      <Dialog
        open={!!model.isOpen}
        onOpenChange={() => setModel((prev) => ({ ...prev, isOpen: false }))}
      >
        <DialogContent className="space-y-4 bg-gray-darkest">
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
          </DialogHeader>
          {model.data && <InquiryDetails inquiry={model.data} type={type} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

function downloadInquiryDetails(
  inquiry: Inquiry | PropertyInquiry | SpecificPropertyInquiry,
) {
  const content = JSON.stringify(inquiry, null, 2);
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `inquiry_${inquiry.id}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
