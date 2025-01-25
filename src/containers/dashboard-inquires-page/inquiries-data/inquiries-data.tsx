import { Suspense } from "react";
import {
  Inquiry,
  PropertyInquiry,
  SpecificPropertyInquiry,
} from "@prisma/client";
import { PropertiesTypesTabs } from "./inquires-types-tabs";
import { StatisticsSection } from "./statistics-section";

type InquiriesDataProps = {
  data: {
    general: Inquiry[];
    property: PropertyInquiry[];
    specific: SpecificPropertyInquiry[];
  };
};

export function InquiriesData({ data }: InquiriesDataProps) {
  return (
    <Suspense>
      <PropertiesTypesTabs />
      <StatisticsSection data={data} />
    </Suspense>
  );
}
