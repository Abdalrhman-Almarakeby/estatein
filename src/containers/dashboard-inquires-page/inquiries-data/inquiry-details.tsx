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
      <div className="grid grid-cols-2 gap-4 text-sm font-medium">
        <div className="space-y-1.5">
          <p>Name</p>
          <p className="text-gray-light">
            {inquiry.firstName} {inquiry.lastName}
          </p>
        </div>
        <div className="space-y-1.5">
          <p>Email</p>
          <p className="text-gray-light">{inquiry.email}</p>
        </div>
        <div className="space-y-1.5">
          <p>Phone</p>
          <p className="text-gray-light">{inquiry.phone}</p>
        </div>
        <div className="space-y-1.5">
          <p>Date</p>
          <p className="text-gray-light">
            {format(inquiry.createdAt, "MMMM d, yyyy 'at' h:mm a")}
          </p>
        </div>
        {type === "general" && (
          <>
            <div className="space-y-1.5">
              <p>Inquiry Type</p>
              <p className="text-gray-light">
                {upperFirst(normalize((inquiry as Inquiry).inquiryType))}
              </p>
            </div>
            <div className="space-y-1.5">
              <p>Referral Source</p>
              <p className="text-gray-light">
                {upperFirst(normalize((inquiry as Inquiry).referralSource))}
              </p>
            </div>
          </>
        )}
        {type === "property" && (
          <>
            <div className="space-y-1.5">
              <p>Location</p>
              <p className="text-gray-light">
                {upperFirst(
                  normalize((inquiry as PropertyInquiry).preferredLocation),
                )}
              </p>
            </div>
            <div className="space-y-1.5">
              <p>Property Type</p>
              <p className="text-gray-light">
                {upperFirst(
                  normalize((inquiry as PropertyInquiry).propertyType),
                )}
              </p>
            </div>
            <div className="space-y-1.5">
              <p>Budget</p>
              <p className="text-gray-light">
                {formatPricingRange((inquiry as PropertyInquiry).budget)}
              </p>
            </div>
          </>
        )}
        {type === "specific" && (
          <div className="space-y-1.5">
            <p>Property ID</p>
            <p className="text-gray-light">
              {(inquiry as SpecificPropertyInquiry).propertyId}
            </p>
          </div>
        )}
      </div>
      <div className="space-y-1.5">
        <p>Message</p>
        <p className="whitespace-pre-wrap text-gray-light">{inquiry.message}</p>
      </div>
    </div>
  );
}
