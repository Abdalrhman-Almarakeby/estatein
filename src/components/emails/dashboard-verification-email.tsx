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
import { getYear } from "date-fns";

type DashboardVerificationEmailProps = {
  username: string;
  verificationCode: string;
};

export function DashboardVerificationEmail({
  username,
  verificationCode,
}: DashboardVerificationEmailProps) {
  const year = getYear(new Date());

  return (
    <Html>
      <Head />
      <Preview>Verify your email</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] font-sans">
          <Container className="mx-auto w-full max-w-[560px]">
            <Section className="overflow-hidden rounded-lg bg-[#141414]">
              <Heading className="my-[30px] px-[40px] text-center text-[28px] font-bold leading-[32px] text-white">
                Email Verification
              </Heading>
              <Text className="mb-[20px] px-[40px] text-[16px] leading-[26px] text-[#e0e0e0]">
                Hello {username},
              </Text>
              <Text className="mb-[20px] px-[40px] text-[16px] leading-[26px] text-[#e0e0e0]">
                Thank you for signing up for the dashboard. To complete your
                registration and gain access, please use the one time password
                below:
              </Text>
              <Section className="my-[40px] text-center">
                <Text className="inline-block border-2 border-[#703bf7] px-[30px] py-[15px] text-[36px] font-bold tracking-[0.2em] text-[#703bf7]">
                  {verificationCode}
                </Text>
              </Section>
              <Text className="mb-[20px] px-[40px] text-[16px] leading-[26px] text-[#e0e0e0]">
                Enter this code on the verification page to confirm your email
                address and activate your account. For security reasons, the
                code will expire after one hour. If an hour has passed, you can
                request a new code from the verification page.
              </Text>
              <Text className="mb-[20px] px-[40px] text-[16px] leading-[26px] text-[#e0e0e0]">
                If you didn't request this verification, please ignore this
                email.
              </Text>
              <Hr className="my-[30px] border-[#333333]" />
              <Text className="mt-[30px] text-center text-[14px] leading-[24px] text-[#8254f8]">
                © {year} Estatein. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
