// TODO: This is not right
import { unstable_cache as cache, revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { SpecificPropertyInquiry } from "@/lib/schemas";

const SPECIFIC_PROPERTY_INQUIRY_CACHE_TAG = "specific-property-inquiry-data";

export const specificPropertyInquiryExistsByEmail = cache(
  async (email: string) => {
    const inquiry = await prisma.specificPropertyInquiry.findFirst({
      where: {
        email: email,
      },
      select: {
        email: true,
      },
    });

    return !!inquiry;
  },
  [SPECIFIC_PROPERTY_INQUIRY_CACHE_TAG],
  { revalidate: false },
);

export const specificPropertyInquiryExistsByPhone = cache(
  async (phone: string) => {
    const inquiry = await prisma.specificPropertyInquiry.findFirst({
      where: {
        phone: phone,
      },
      select: {
        phone: true,
      },
    });

    return !!inquiry;
  },
  [SPECIFIC_PROPERTY_INQUIRY_CACHE_TAG],
  { revalidate: false },
);

export const createSpecificPropertyInquiry = async (
  data: Omit<SpecificPropertyInquiry, "agreeOnTerms">,
) => {
  await prisma.specificPropertyInquiry.create({
    data,
  });

  revalidateTag(SPECIFIC_PROPERTY_INQUIRY_CACHE_TAG);
};
