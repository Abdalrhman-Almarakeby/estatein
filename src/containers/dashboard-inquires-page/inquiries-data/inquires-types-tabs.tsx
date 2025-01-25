"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Building, Home, MessageSquare } from "lucide-react";
import { cn, upperFirst } from "@/lib/utils";

const INQUIRIES_TYPES = ["general", "property", "specific"] as const;

export function PropertiesTypesTabs() {
  const searchParams = useSearchParams();

  const inquiresType = searchParams.get("inquiresType");

  const currentInquiresType =
    inquiresType &&
    (INQUIRIES_TYPES as ReadonlyArray<string>).includes(inquiresType)
      ? inquiresType
      : "general";

  return (
    <div className="mb-6">
      <div className="flex border-b">
        {INQUIRIES_TYPES.map((type) => (
          <Link
            scroll={false}
            href={`?inquiresType=${type}`}
            key={type}
            className={cn(
              "no-underlinek border-b-2 px-4 py-2 font-semibold",
              currentInquiresType === type
                ? "border-purple-medium text-purple-medium"
                : "border-transparent text-gray-light",
            )}
          >
            {type === "general" && (
              <MessageSquare className="mr-2 inline-block size-4" />
            )}
            {type === "property" && (
              <Home className="mr-2 inline-block size-4" />
            )}
            {type === "specific" && (
              <Building className="mr-2 inline-block size-4" />
            )}
            {upperFirst(type)} Inquiries
          </Link>
        ))}
      </div>
    </div>
  );
}
