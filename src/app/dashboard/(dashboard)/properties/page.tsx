import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { PropertiesTable } from "@/containers/dashboard-properties-page/properties-table";
import { prisma } from "@/lib/prisma";

export default async function PropertiesDashboard() {
  const properties = await prisma.property.findMany();

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Properties Dashboard</h1>
        <Link
          // TODO
          href="/dashboard/properties"
          className="btn btn-primary py-2 px-4 rounded inline-flex gap-2 items-center"
        >
          Add New Property
          <PlusCircle size={16} />
        </Link>
      </div>

      <PropertiesTable properties={properties} />
    </div>
  );
}
