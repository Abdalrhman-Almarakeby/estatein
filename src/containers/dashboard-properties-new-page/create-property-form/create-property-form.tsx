"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PropertyType } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";
import { FieldError } from "@/components/form/field-error";
import { FormattedNumberInput } from "@/components/form/formatted-number-input";
import { Input } from "@/components/form/input";
import { MultiImageUpload } from "@/components/form/multi-image-upload/multi-image-upload";
import { MultiInput } from "@/components/form/multi-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/form/select";
import { Textarea } from "@/components/form/textarea";
import { useToastNotification } from "@/hooks";
import { normalize } from "@/lib/utils";
import { CreateProperty, createPropertySchema } from "@/lib/schemas";
import { LOCATIONS } from "@/constant/filters-data/locations";
import { createProperty } from "@/server/actions/create-property";

type CreatePropertyFormProps = {
  onPropertyCreated: (property: { id: string; name: string }) => void;
};

export function CreatePropertyForm({
  onPropertyCreated,
}: CreatePropertyFormProps) {
  const toastNotification = useToastNotification({
    successMessage: "Property created successfully",
    errorMessage: "Failed to create property",
    loadingMessage: "Creating property...",
  });

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateProperty>({
    resolver: zodResolver(createPropertySchema),
  });

  const onSubmit = async (data: CreateProperty) => {
    toastNotification.showLoading();

    try {
      const { success, data: property } = await createProperty(data);

      if (!success || !property) {
        toastNotification.showError();
        return;
      }

      onPropertyCreated({ id: property.id, name: property.title });
      toastNotification.showSuccess();
    } catch (error) {
      toastNotification.showError();
    }
  };

  return (
    <div className="container mx-auto py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8 mx-auto">Add New Property</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <fieldset className="space-y-2.5 lg:space-y-4">
            <label className="lg:text-lg 3xl:text-xl" htmlFor="title">
              Title
            </label>
            <Input
              id="title"
              placeholder="Property Title"
              {...register("title")}
            />
            {errors.title?.message && (
              <FieldError className="!mt-1 2xl:text-base">
                {errors.title.message}
              </FieldError>
            )}
          </fieldset>

          <fieldset className="space-y-2.5 lg:space-y-4">
            <label className="lg:text-lg 3xl:text-xl" htmlFor="location">
              Location
            </label>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger ref={field.ref}>
                    <SelectValue placeholder="Select a property type" />
                  </SelectTrigger>
                  <SelectContent>
                    {LOCATIONS.map((location) => (
                      <SelectItem key={location} value={location}>
                        {normalize(location)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.location?.message && (
              <FieldError className="!mt-1 2xl:text-base">
                {errors.location.message}
              </FieldError>
            )}
          </fieldset>

          <fieldset className="space-y-2.5 lg:space-y-4">
            <label className="lg:text-lg 3xl:text-xl" htmlFor="propertyType">
              Property Type
            </label>
            <Controller
              name="propertyType"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger ref={field.ref}>
                    <SelectValue placeholder="Select a property type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(PropertyType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {normalize(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.propertyType?.message && (
              <FieldError className="!mt-1 2xl:text-base">
                {errors.propertyType.message}
              </FieldError>
            )}
          </fieldset>

          <fieldset className="space-y-2.5 lg:space-y-4">
            <label className="lg:text-lg 3xl:text-xl" htmlFor="bedrooms">
              Bedrooms
            </label>
            <FormattedNumberInput
              control={control}
              id="bedrooms"
              placeholder="Number of Bedrooms"
              name="bedrooms"
            />
            {errors.bedrooms?.message && (
              <FieldError className="!mt-1 2xl:text-base">
                {errors.bedrooms.message}
              </FieldError>
            )}
          </fieldset>

          <fieldset className="space-y-2.5 lg:space-y-4">
            <label className="lg:text-lg 3xl:text-xl" htmlFor="bathrooms">
              Bathrooms
            </label>
            <FormattedNumberInput
              control={control}
              id="bathrooms"
              placeholder="Number of Bathrooms"
              name="bathrooms"
            />
            {errors.bathrooms?.message && (
              <FieldError className="!mt-1 2xl:text-base">
                {errors.bathrooms.message}
              </FieldError>
            )}
          </fieldset>

          <fieldset className="space-y-2.5 lg:space-y-4">
            <label className="lg:text-lg 3xl:text-xl" htmlFor="area">
              Area (sq ft)
            </label>
            <FormattedNumberInput
              control={control}
              suffix=" sq ft"
              id="area"
              placeholder="Property Area"
              name="area"
            />
            {errors.area?.message && (
              <FieldError className="!mt-1 2xl:text-base">
                {errors.area.message}
              </FieldError>
            )}
          </fieldset>
        </div>

        <fieldset className="space-y-2.5 lg:space-y-4">
          <label className="lg:text-lg 3xl:text-xl" htmlFor="title">
            Features
          </label>
          <MultiInput
            name="features"
            // @ts-expect-error // TODO
            control={control}
            placeholder="Enter an item and press Enter"
          />
          {errors.features?.message && (
            <FieldError className="!mt-1 2xl:text-base">
              {errors.features.message}
            </FieldError>
          )}
        </fieldset>

        <fieldset className="space-y-2.5 lg:space-y-4">
          <label className="lg:text-lg 3xl:text-xl" htmlFor="description">
            Description
          </label>
          <Textarea
            id="description"
            placeholder="Property Description"
            {...register("description")}
          />
          {errors.description?.message && (
            <FieldError className="!mt-1 2xl:text-base">
              {errors.description.message}
            </FieldError>
          )}
        </fieldset>

        <fieldset className="space-y-2.5 lg:space-y-4">
          <label className="lg:text-lg 3xl:text-xl" htmlFor="title">
            Images
          </label>
          <MultiImageUpload name="images" control={control} maxNumber={15} />
          {errors.images?.message && (
            <FieldError className="!mt-1 2xl:text-base">
              {errors.images.message}
            </FieldError>
          )}
        </fieldset>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <fieldset className="space-y-2.5 lg:space-y-4">
            <label className="lg:text-lg 3xl:text-xl" htmlFor="listingPrice">
              Listing Price
            </label>
            <FormattedNumberInput
              control={control}
              id="listingPrice"
              placeholder="Listing Price"
              isCurrency={true}
              name="listingPrice"
            />
            {errors.listingPrice?.message && (
              <FieldError className="!mt-1 2xl:text-base">
                {errors.listingPrice.message}
              </FieldError>
            )}
          </fieldset>

          <fieldset className="space-y-2.5 lg:space-y-4">
            <label className="lg:text-lg 3xl:text-xl" htmlFor="transferTax">
              Transfer Tax
            </label>
            <FormattedNumberInput
              control={control}
              id="transferTax"
              placeholder="Transfer Tax"
              isCurrency={true}
              name="transferTax"
            />
            {errors.transferTax?.message && (
              <FieldError className="!mt-1 2xl:text-base">
                {errors.transferTax.message}
              </FieldError>
            )}
          </fieldset>

          <fieldset className="space-y-2.5 lg:space-y-4">
            <label className="lg:text-lg 3xl:text-xl" htmlFor="legalFees">
              Legal Fees
            </label>
            <FormattedNumberInput
              control={control}
              id="legalFees"
              placeholder="Legal Fees"
              isCurrency={true}
              name="legalFees"
            />
            {errors.legalFees?.message && (
              <FieldError className="!mt-1 2xl:text-base">
                {errors.legalFees.message}
              </FieldError>
            )}
          </fieldset>

          <fieldset className="space-y-2.5 lg:space-y-4">
            <label className="lg:text-lg 3xl:text-xl" htmlFor="homeInspection">
              Home Inspection
            </label>
            <FormattedNumberInput
              control={control}
              id="homeInspection"
              placeholder="Home Inspection Cost"
              isCurrency={true}
              name="homeInspection"
            />
            {errors.homeInspection?.message && (
              <FieldError className="!mt-1 2xl:text-base">
                {errors.homeInspection.message}
              </FieldError>
            )}
          </fieldset>

          <fieldset className="space-y-2.5 lg:space-y-4">
            <label className="lg:text-lg 3xl:text-xl" htmlFor="insurance">
              Insurance
            </label>
            <FormattedNumberInput
              control={control}
              id="insurance"
              placeholder="Insurance Cost"
              isCurrency={true}
              name="insurance"
            />
            {errors.insurance?.message && (
              <FieldError className="!mt-1 2xl:text-base">
                {errors.insurance.message}
              </FieldError>
            )}
          </fieldset>

          <fieldset className="space-y-2.5 lg:space-y-4">
            <label className="lg:text-lg 3xl:text-xl" htmlFor="taxes">
              Taxes
            </label>
            <FormattedNumberInput
              control={control}
              id="taxes"
              placeholder="Taxes"
              isCurrency={true}
              name="taxes"
            />
            {errors.taxes?.message && (
              <FieldError className="!mt-1 2xl:text-base">
                {errors.taxes.message}
              </FieldError>
            )}
          </fieldset>

          <fieldset className="space-y-2.5 lg:space-y-4">
            <label
              className="lg:text-lg 3xl:text-xl"
              htmlFor="homeownersAssociationFee"
            >
              HOA Fee
            </label>
            <FormattedNumberInput
              control={control}
              id="homeownersAssociationFee"
              placeholder="HOA Fee"
              isCurrency={true}
              name="homeownersAssociationFee"
            />
            {errors.homeownersAssociationFee?.message && (
              <FieldError className="!mt-1 2xl:text-base">
                {errors.homeownersAssociationFee.message}
              </FieldError>
            )}
          </fieldset>

          <fieldset className="space-y-2.5 lg:space-y-4">
            <label className="lg:text-lg 3xl:text-xl" htmlFor="additionalFees">
              Additional Fees
            </label>
            <FormattedNumberInput
              control={control}
              id="additionalFees"
              placeholder="Additional Fees"
              isCurrency={true}
              name="additionalFees"
            />
            {errors.additionalFees?.message && (
              <FieldError className="!mt-1 2xl:text-base">
                {errors.additionalFees.message}
              </FieldError>
            )}
          </fieldset>

          <fieldset className="space-y-2.5 lg:space-y-4">
            <label className="lg:text-lg 3xl:text-xl" htmlFor="downPayment">
              Down Payment
            </label>
            <FormattedNumberInput
              control={control}
              id="downPayment"
              placeholder="Down Payment"
              isCurrency={true}
              name="downPayment"
            />
            {errors.downPayment?.message && (
              <FieldError className="!mt-1 2xl:text-base">
                {errors.downPayment.message}
              </FieldError>
            )}
          </fieldset>

          <fieldset className="space-y-2.5 lg:space-y-4">
            <label className="lg:text-lg 3xl:text-xl" htmlFor="mortgage">
              Mortgage
            </label>
            <FormattedNumberInput
              control={control}
              id="mortgage"
              placeholder="Mortgage"
              isCurrency={true}
              name="mortgage"
            />
            {errors.mortgage?.message && (
              <FieldError className="!mt-1 2xl:text-base">
                {errors.mortgage.message}
              </FieldError>
            )}
          </fieldset>

          <button
            type="submit"
            className="btn-sm btn-primary py-2 md:col-span-2 text-lg"
          >
            Create Property
          </button>
        </div>
      </form>
    </div>
  );
}
