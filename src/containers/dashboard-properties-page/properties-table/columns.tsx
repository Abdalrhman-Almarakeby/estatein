import { Property } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { formatPrice, normalize, upperFirst } from "@/lib/utils";
import { ActionsMenu } from "./actions-menu";
import { SortableHeader } from "./sortable-header";

export const columns: ColumnDef<Property>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <SortableHeader column={column}>Title</SortableHeader>
    ),
    cell: ({ row }) => row.getValue("title"),
  },
  {
    accessorKey: "propertyType",
    header: "Type",
    cell: ({ row }) => upperFirst(normalize(row.getValue("propertyType"))),
  },
  {
    accessorKey: "listingPrice",
    header: ({ column }) => (
      <SortableHeader column={column}>Price</SortableHeader>
    ),
    cell: ({ row }) => formatPrice(row.getValue("listingPrice")),
  },
  {
    accessorKey: "bedrooms",
    header: ({ column }) => (
      <SortableHeader column={column}>Bedrooms</SortableHeader>
    ),
  },
  {
    accessorKey: "bathrooms",
    header: ({ column }) => (
      <SortableHeader column={column}>Bathrooms</SortableHeader>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <ActionsMenu
        propertyId={row.original.id}
        propertyName={row.original.title}
      />
    ),
  },
];
