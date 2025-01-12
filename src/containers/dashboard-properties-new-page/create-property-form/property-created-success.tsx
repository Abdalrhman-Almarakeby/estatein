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
    <div className="relative grid place-content-center size-full">
      <div className="w-full mx-auto bg-gray-darker shadow-lg rounded-lg overflow-hidden">
        <div className="p-8 pb-12">
          <h2 className="text-center text-3xl gap-2 font-bold text-purple-medium flex items-center justify-center">
            <CheckCircle />
            Property Created Successfully!
          </h2>

          <p className="text-center mt-2">
            Your new property "{propertyTitle}" has been added to the system.
          </p>

          <div className="grid grid-cols-2 gap-2 text-center mt-10">
            <Link
              className=" py-2 px-4 btn-sm btn-primary"
              href={`/properties/${propertyId}`}
            >
              View Property Page
            </Link>
            <Link
              className="py-2 px-4 btn-sm btn-tertiary"
              // @ts-expect-error // TODO
              href={`/dashboard/properties/${propertyId}/edit`}
            >
              Edit property
            </Link>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-dark flex justify-between">
          <Link
            className="flex gap-2 !no-underline"
            href={"/dashboard/properties"}
          >
            <List /> Back to List
          </Link>
          <button
            className="flex gap-2 !no-underline"
            onClick={() => onCreateNewProperty()}
          >
            <Plus /> Create Another
          </button>
        </div>
      </div>
    </div>
  );
}
