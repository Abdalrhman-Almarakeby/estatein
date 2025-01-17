import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { formatDuration, getYear } from "date-fns";
import { EMAIL_VERIFICATION_CODE_EXPIRY_MINUTES } from "@/constant";

type EmailVerificationProps = {
  recipientName: string;
  verificationCode: string;
};

export function EmailVerification({
  recipientName,
  verificationCode,
}: EmailVerificationProps) {
  const currentYear = getYear(new Date());
  const expiryTime = formatDuration({
    minutes: EMAIL_VERIFICATION_CODE_EXPIRY_MINUTES,
  });

  return (
    <Html>
      <Head />
      <Preview>Complete Your Account Verification</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] font-sans">
          <Container className="mx-auto w-full max-w-[560px]">
            <Section className="overflow-hidden rounded-lg bg-[#141414]">
              <Heading className="my-[30px] px-[40px] text-center text-[28px] font-bold leading-[32px] text-white">
                Verify Your Account
              </Heading>
              <Text className="mb-[20px] px-[40px] text-[16px] leading-[26px] text-[#e0e0e0]">
                Hello {recipientName},
              </Text>
              <Text className="mb-[20px] px-[40px] text-[16px] leading-[26px] text-[#e0e0e0]">
                Thank you for signing up. Please use this verification code to
                complete your registration:
              </Text>
              <Section className="my-[40px] text-center">
                <Text className="inline-block border-2 border-[#703bf7] px-[30px] py-[15px] text-[36px] font-bold tracking-[0.2em] text-[#703bf7]">
                  {verificationCode}
                </Text>
              </Section>
              <Text className="mb-[20px] px-[40px] text-[16px] leading-[26px] text-[#e0e0e0]">
                This code will expire in {expiryTime}. If it expires, you can
                request a new one from the verification page.
              </Text>
              <Text className="mb-[20px] px-[40px] text-[16px] leading-[26px] text-[#e0e0e0]">
                If you didn't create an account, please disregard this email.
              </Text>
              <Hr className="my-[30px] border-[#333333]" />
              <Text className="mt-[30px] text-center text-[14px] leading-[24px] text-[#8254f8]">
                © {currentYear} Estatein. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
