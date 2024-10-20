import { Property } from "@prisma/client";

export function getPropertyAdditionalFees({
  transferTax,
  legalFees,
  homeInspection,
  insurance,
}: Pick<
  Property,
  "transferTax" | "legalFees" | "homeInspection" | "insurance"
>) {
  return {
    title: "Additional Fees",
    data: [
      {
        label: "Property Transfer Tax",
        value: transferTax,
        description: "Based on the sale price and local regulations",
      },
      {
        label: "Legal Fees",
        value: legalFees,
        description:
          "Approximate cost for legal services, including title transfer",
      },
      {
        label: "Home Inspection",
        value: homeInspection,
        description: "Recommended for due diligence",
      },
      {
        label: "Property Insurance",
        value: insurance,
        description: "Annual cost for comprehensive property insurance",
      },
      {
        label: "Mortgage",
        value: "Varies",
        description:
          "If applicable, consult with your lender for specific details",
      },
    ],
  };
}

export function getMonthlyCostsData({
  taxes,
  homeownersAssociationFee,
}: Pick<Property, "taxes" | "homeownersAssociationFee">) {
  return {
    title: "Monthly Costs",
    data: [
      {
        label: "Property Taxes",
        value: taxes,
        description:
          "Approximate monthly property tax based on the sale price and local rates",
      },
      {
        label: "Homeowners' Association Fee",
        value: homeownersAssociationFee,
        description: "Monthly fee for common area maintenance and security",
      },
    ],
  };
}

export function getTotalInitialCostsData({
  listingPrice,
  additionalFees,
  downPayment,
  mortgage,
}: Pick<
  Property,
  "listingPrice" | "additionalFees" | "downPayment" | "mortgage"
>) {
  return {
    title: "Total Initial Costs",
    data: [
      {
        label: "Listing Price",
        value: listingPrice,
      },
      {
        label: "Additional Fees",
        value: additionalFees,
        description: "Property transfer tax, legal fees, inspection, insurance",
      },
      {
        label: "Down Payment",
        value: downPayment,
        description: "20%",
      },
      {
        label: "Mortgage Amount",
        value: mortgage,
        description: "If applicable",
      },
    ],
  };
}
