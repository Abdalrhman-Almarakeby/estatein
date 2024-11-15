import { unstable_cache as cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { SpecificPropertyInquiry } from "@/lib/schemas";

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
);

export const createSpecificPropertyInquiry = async (
  data: Omit<SpecificPropertyInquiry, "agreeOnTerms">,
) => {
  await prisma.specificPropertyInquiry.create({
    data,
  });
};
