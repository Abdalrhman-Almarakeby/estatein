"use client";

import { Building, Home, MessageSquare } from "lucide-react";
import { InquiryType } from "@/types";
import { cn, upperFirst } from "@/lib/utils";
import { INQUIRIES_TYPES } from "@/constant";

type PropertiesTypesTabsProps = {
  activeTab: InquiryType;
  setActiveTab: (tab: InquiryType) => void;
};

export function PropertiesTypesTabs({
  activeTab,
  setActiveTab,
}: PropertiesTypesTabsProps) {
  return (
    <div className="mb-6">
      <div className="flex border-b">
        {INQUIRIES_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={cn(
              "border-b-2 px-4 py-2 font-semibold no-underline",
              activeTab === type
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
          </button>
        ))}
      </div>
    </div>
  );
}
