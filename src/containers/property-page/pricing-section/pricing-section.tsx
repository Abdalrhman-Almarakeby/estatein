import { Property } from "@prisma/client";
import { Section, SectionTitle } from "@/components/ui/section";
import {
  getMonthlyCostsData,
  getPropertyAdditionalFees,
  getTotalInitialCostsData,
} from "@/lib/utils";
import { DisclaimerBox } from "./disclaimer-box";
import { ListingPrice } from "./listing-price";
import { PriceDetails } from "./price-details";

type PricingSectionProps = Property;

export function PricingSection(property: PricingSectionProps) {
  return (
    <Section>
      <SectionTitle
        title="Comprehensive Pricing Details"
        paragraph={`At Estatein, transparency is key. We want you to have a clear understanding of all costs associated with your property investment. Below, we break down the pricing for ${property.title} to help you make an informed decision`}
      />
      <DisclaimerBox className="-mt-4" />
      <section className="flex flex-col gap-5 lg:flex-row lg:gap-10 xl:gap-12.5">
        <ListingPrice
          listingPrice={property.listingPrice}
          className="lg:sticky lg:top-10 lg:self-start lg:pb-30"
        />
        <div className="space-y-5 sm:space-y-7.5 xl:space-y-10 2xl:space-y-12.5">
          <PriceDetails {...getPropertyAdditionalFees(property)} />
          <PriceDetails {...getMonthlyCostsData(property)} />
          <PriceDetails {...getTotalInitialCostsData(property)} />
        </div>
      </section>
    </Section>
  );
}
