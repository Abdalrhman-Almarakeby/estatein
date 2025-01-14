import { unstable_cache as cache, revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { Inquiry } from "@/lib/schemas";

const INQUIRY_CACHE_TAG = "inquiry-data";

export const inquiryExistsByEmail = cache(
  async (email: string) => {
    const inquiry = await prisma.inquiry.findFirst({
      where: {
        email: email,
      },
      select: {
        email: true,
      },
    });

    return !!inquiry;
  },
  [INQUIRY_CACHE_TAG],
  { revalidate: false },
);

export const inquiryExistsByPhone = cache(
  async (phone: string) => {
    const inquiry = await prisma.inquiry.findFirst({
      where: {
        phone: phone,
      },
      select: {
        phone: true,
      },
    });

    return !!inquiry;
  },
  [INQUIRY_CACHE_TAG],
  { revalidate: false },
);

export const createInquiry = async (data: Omit<Inquiry, "agreeOnTerms">) => {
  await prisma.inquiry.create({
    data,
  });

  revalidateTag(INQUIRY_CACHE_TAG);
};
