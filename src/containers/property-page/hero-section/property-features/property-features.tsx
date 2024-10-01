import { Feature } from "./feature";

type PropertyFeaturesProps = {
  features: string[];
};

export function PropertyFeatures({ features }: PropertyFeaturesProps) {
  return (
    <div className="space-y-5 rounded-[10px] border p-5 sm:space-y-7.5 sm:p-7.5 xl:space-y-10 xl:p-10 3xl:space-y-12.5 3xl:p-12.5">
      <h3 className="text-lg font-semibold sm:text-xl lg:text-[1.375rem] 2xl:text-2xl">
        Key Features and Amenities
      </h3>
      <div className="text-primary grid gap-4.5 lg:gap-5 xl:gap-6 3xl:gap-7.5">
        {features.map((feature) => (
          <Feature key={feature}>{feature}</Feature>
        ))}
      </div>
    </div>
  );
}
