import { unstable_cache as cache, revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { PropertyInquiry } from "@/lib/schemas";

const PROPERTY_INQUIRY_CACHE_TAG = "property-inquiry-data";

export const propertyInquiryExistsByEmail = cache(
  async (email: string) => {
    const inquiry = await prisma.propertyInquiry.findFirst({
      where: {
        email: email,
      },
      select: {
        email: true,
      },
    });

    return !!inquiry;
  },
  [PROPERTY_INQUIRY_CACHE_TAG],
  { revalidate: false },
);

export const propertyInquiryExistsByPhone = cache(
  async (phone: string) => {
    const inquiry = await prisma.propertyInquiry.findFirst({
      where: {
        phone: phone,
      },
      select: {
        phone: true,
      },
    });

    return !!inquiry;
  },
  [PROPERTY_INQUIRY_CACHE_TAG],
  { revalidate: false },
);

export const createPropertyInquiry = async (
  data: Omit<PropertyInquiry, "agreeOnTerms" | "bathrooms" | "bedrooms"> & {
    bathrooms: number;
    bedrooms: number;
  },
) => {
  await prisma.propertyInquiry.create({
    data,
  });

  revalidateTag(PROPERTY_INQUIRY_CACHE_TAG);
};
