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
import { format as formatDate } from "date-fns";
import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import {
  ArrowUpDown,
  Copy,
  Download,
  Eye,
  FileSpreadsheetIcon as FileCsv,
  FileSpreadsheet,
  FileText,
  MessageCircle,
  MoreHorizontal,
} from "lucide-react";
import Papa from "papaparse";
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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
import { InquiryType } from "@/types";
import { InquiryDetails } from "./inquiry-details";

type InquiryDataTableProps = {
  inquiries: (Inquiry | PropertyInquiry | SpecificPropertyInquiry)[];
  type: InquiryType;
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
        formatDate(
          new Date(row.getValue("createdAt")),
          "MMM d, yyyy 'at' h:mm a",
        ),
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
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Download className="mr-2 h-4 w-4" />
                Download Details
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() => downloadInquiryDetails(row.original, "pdf")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  PDF
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => downloadInquiryDetails(row.original, "excel")}
                >
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Excel
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => downloadInquiryDetails(row.original, "csv")}
                >
                  <FileCsv className="mr-2 h-4 w-4" />
                  CSV
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => downloadInquiryDetails(row.original, "json")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  JSON
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
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
    // TODO:
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
  format: "json" | "pdf" | "excel" | "csv" = "json",
) {
  const filename = `inquiry_${inquiry.id}`;

  switch (format) {
    case "json":
      const jsonContent = JSON.stringify(inquiry, null, 2);
      const jsonBlob = new Blob([jsonContent], { type: "application/json" });
      saveAs(jsonBlob, `${filename}.json`);
      break;

    case "pdf":
      const pdf = new jsPDF();

      pdf.setFontSize(16);
      pdf.text("Inquiry Details", 20, 20);

      pdf.setFontSize(12);
      let yPosition = 30;

      pdf.text(`ID: ${inquiry.id}`, 20, yPosition);
      yPosition += 10;
      pdf.text(
        `Date: ${formatDate(new Date(inquiry.createdAt), "MMM d, yyyy 'at' h:mm a")}`,
        20,
        yPosition,
      );
      yPosition += 10;
      pdf.text(`Name: ${inquiry.firstName} ${inquiry.lastName}`, 20, yPosition);
      yPosition += 10;
      pdf.text(`Email: ${inquiry.email}`, 20, yPosition);
      yPosition += 10;
      pdf.text(`Phone: ${inquiry.phone || "N/A"}`, 20, yPosition);
      yPosition += 10;
      pdf.text(
        `Status: ${inquiry.replied ? "Replied" : "Pending"}`,
        20,
        yPosition,
      );
      yPosition += 10;

      pdf.text("Message:", 20, yPosition);
      yPosition += 10;

      const message = inquiry.message || "";
      const splitMessage = pdf.splitTextToSize(message, 170);
      pdf.text(splitMessage, 20, yPosition);

      if ("propertyId" in inquiry) {
        yPosition += splitMessage.length * 7 + 10;
        pdf.text(
          `Property ID: ${(inquiry as SpecificPropertyInquiry).propertyId}`,
          20,
          yPosition,
        );
      }

      pdf.save(`${filename}.pdf`);
      break;

    case "excel":
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Inquiry Details");

      worksheet.columns = [
        { header: "Field", key: "field", width: 20 },
        { header: "Value", key: "value", width: 50 },
      ];

      worksheet.addRow({ field: "ID", value: inquiry.id });
      worksheet.addRow({
        field: "Date",
        value: formatDate(
          new Date(inquiry.createdAt),
          "MMM d, yyyy 'at' h:mm a",
        ),
      });
      worksheet.addRow({
        field: "Name",
        value: `${inquiry.firstName} ${inquiry.lastName}`,
      });
      worksheet.addRow({ field: "Email", value: inquiry.email });
      worksheet.addRow({ field: "Phone", value: inquiry.phone || "N/A" });
      worksheet.addRow({
        field: "Status",
        value: inquiry.replied ? "Replied" : "Pending",
      });
      worksheet.addRow({ field: "Message", value: inquiry.message || "" });

      if ("propertyId" in inquiry) {
        worksheet.addRow({
          field: "Property ID",
          value: (inquiry as SpecificPropertyInquiry).propertyId,
        });
      }

      worksheet.getRow(1).font = { bold: true };

      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, `${filename}.xlsx`);
      });
      break;

    case "csv":
      const csvData = [
        { Field: "ID", Value: inquiry.id },
        {
          Field: "Date",
          Value: formatDate(
            new Date(inquiry.createdAt),
            "MMM d, yyyy 'at' h:mm a",
          ),
        },
        { Field: "Name", Value: `${inquiry.firstName} ${inquiry.lastName}` },
        { Field: "Email", Value: inquiry.email },
        { Field: "Phone", Value: inquiry.phone || "N/A" },
        { Field: "Status", Value: inquiry.replied ? "Replied" : "Pending" },
        { Field: "Message", Value: inquiry.message || "" },
      ];

      if ("propertyId" in inquiry) {
        csvData.push({
          Field: "Property ID",
          Value: (inquiry as SpecificPropertyInquiry).propertyId,
        });
      }

      const csv = Papa.unparse(csvData);
      const csvBlob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      saveAs(csvBlob, `${filename}.csv`);
      break;
  }
}
