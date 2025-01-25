"use client";

import {
  Inquiry,
  PropertyInquiry,
  SpecificPropertyInquiry,
} from "@prisma/client";
import { format } from "date-fns";
import { InquiresType } from "@/types";
import { formatPricingRange, normalize, upperFirst } from "@/lib/utils";

type InquiryDetailsProps = {
  inquiry: Inquiry | PropertyInquiry | SpecificPropertyInquiry;
  type: InquiresType;
};

export function InquiryDetails({ inquiry, type }: InquiryDetailsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium">Name</p>
          <p className="text-sm text-gray-light">
            {inquiry.firstName} {inquiry.lastName}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Email</p>
          <p className="text-sm text-gray-light">{inquiry.email}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Phone</p>
          <p className="text-sm text-gray-light">{inquiry.phone}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Date</p>
          <p className="text-sm text-gray-light">
            {format(new Date(inquiry.createdAt), "MMMM d, yyyy 'at' h:mm a")}
          </p>
        </div>
        {type === "general" && (
          <>
            <div>
              <p className="text-sm font-medium">Inquiry Type</p>
              <p className="text-sm text-gray-light">
                {(inquiry as Inquiry).inquiryType}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Referral Source</p>
              <p className="text-sm text-gray-light">
                {(inquiry as Inquiry).referralSource}
              </p>
            </div>
          </>
        )}
        {type === "property" && (
          <>
            <div>
              <p className="text-sm font-medium">Location</p>
              <p className="text-sm text-gray-light">
                {upperFirst(
                  normalize((inquiry as PropertyInquiry).preferredLocation),
                )}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Property Type</p>
              <p className="text-sm text-gray-light">
                {upperFirst(
                  normalize((inquiry as PropertyInquiry).propertyType),
                )}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Budget</p>
              <p className="text-sm text-gray-light">
                {formatPricingRange((inquiry as PropertyInquiry).budget)}
              </p>
            </div>
          </>
        )}
        {type === "specific" && (
          <div>
            <p className="text-sm font-medium">Property ID</p>
            <p className="text-sm text-gray-light">
              {(inquiry as SpecificPropertyInquiry).propertyId}
            </p>
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium">Message</p>
        <p className="whitespace-pre-wrap text-sm text-gray-light">
          {inquiry.message}
        </p>
      </div>
    </div>
  );
}
