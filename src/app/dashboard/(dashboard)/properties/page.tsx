import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { PropertiesTable } from "@/containers/dashboard-properties-page/properties-table";
import { generateNonSEOMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";

export const metadata = generateNonSEOMetadata({
  title: "Properties - Estatein",
  description: "Manage and view all properties.",
});

export default async function Page() {
  const properties = await prisma.property.findMany();
  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Properties Dashboard</h1>
        <Link
          href="/dashboard/properties/new"
          className="btn btn-primary inline-flex items-center gap-2 rounded px-4 py-2"
        >
          Add New Property
          <PlusCircle size={16} />
        </Link>
      </div>

      <PropertiesTable properties={properties} />
    </div>
  );
}
