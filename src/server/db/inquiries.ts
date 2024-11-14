import { unstable_cache as cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { Inquiry } from "@/lib/schemas";

export const inquiryExistsByEmail = cache(async (email: string) => {
  const inquiry = await prisma.inquiry.findFirst({
    where: {
      email: email,
    },
    select: {
      email: true,
    },
  });

  return !!inquiry;
});

export const inquiryExistsByPhone = cache(async (phone: string) => {
  const inquiry = await prisma.inquiry.findFirst({
    where: {
      phone: phone,
    },
    select: {
      phone: true,
    },
  });

  return !!inquiry;
});

export const createInquiry = async (data: Omit<Inquiry, "agreeOnTerms">) => {
  await prisma.inquiry.create({
    data,
  });
};
