import Link from "next/link";
import { CheckCircle, List, Plus } from "lucide-react";

type PropertyCreatedSuccessProps = {
  propertyId: string;
  propertyTitle: string;
  onCreateNewProperty: () => void;
};

export function PropertyCreatedSuccess({
  propertyId,
  propertyTitle,
  onCreateNewProperty,
}: PropertyCreatedSuccessProps) {
  return (
    <div className="relative grid size-full place-content-center">
      <div className="mx-auto w-full overflow-hidden rounded-lg bg-gray-darker shadow-lg">
        <div className="p-8 pb-12">
          <h2 className="flex items-center justify-center gap-2 text-center text-3xl font-bold text-purple-medium">
            <CheckCircle />
            Property Created Successfully!
          </h2>

          <p className="mt-2 text-center">
            Your property "{propertyTitle}" has been added to the system.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-2 text-center">
            <Link
              className="btn-sm btn-primary px-4 py-2"
              href={`/properties/${propertyId}`}
            >
              View Property Page
            </Link>
            <Link
              className="btn-sm btn-tertiary px-4 py-2"
              href={`/dashboard/properties/${propertyId}/edit`}
            >
              Edit Property
            </Link>
          </div>
        </div>
        <div className="flex justify-between bg-gray-dark px-6 py-4">
          <Link
            className="flex gap-2 !no-underline"
            href={"/dashboard/properties"}
          >
            <List /> Back to List
          </Link>
          <button
            className="flex gap-2 !no-underline"
            onClick={onCreateNewProperty}
          >
            <Plus /> Create Another
          </button>
        </div>
      </div>
    </div>
  );
}
