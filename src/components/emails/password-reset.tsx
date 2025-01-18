import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { formatDuration, getYear } from "date-fns";
import { AUTH_CONFIG } from "@/config/auth";

type PasswordResetProps = {
  recipientName: string;
  resetUrl: string;
};

export function PasswordReset({ recipientName, resetUrl }: PasswordResetProps) {
  const currentYear = getYear(new Date());
  const expiryTime = formatDuration({
    minutes: AUTH_CONFIG.forgotPassword.tokenExpiryMinutes,
  });

  return (
    <Html>
      <Head />
      <Preview>Reset Your Password</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] font-sans">
          <Container className="mx-auto w-full max-w-[560px]">
            <Section className="overflow-hidden rounded-lg bg-[#141414]">
              <Heading className="my-[30px] px-[40px] text-center text-[28px] font-bold leading-[32px] text-white">
                Reset Your Password
              </Heading>
              <Text className="mb-[20px] px-[40px] text-[16px] leading-[26px] text-[#e0e0e0]">
                Hello {recipientName},
              </Text>
              <Text className="mb-[20px] px-[40px] text-[16px] leading-[26px] text-[#e0e0e0]">
                We received a password reset request for your account. If you
                didn't make this request, you can ignore this email.
              </Text>
              <Section className="my-[40px] text-center">
                <Button
                  href={resetUrl}
                  className="inline-block rounded bg-[#703bf7] px-[30px] py-[15px] text-[16px] font-bold text-white no-underline"
                >
                  Reset Password
                </Button>
              </Section>
              <Text className="mb-[20px] px-[40px] text-[16px] leading-[26px] text-[#e0e0e0]">
                Alternatively, copy and paste this link into your browser:
              </Text>
              <Text className="mb-[20px] px-[40px] text-[14px] leading-[24px] text-[#8254f8]">
                <Link href={resetUrl} className="text-[#8254f8]">
                  {resetUrl}
                </Link>
              </Text>
              <Text className="mb-[20px] px-[40px] text-[16px] leading-[26px] text-[#e0e0e0]">
                This link expires in {expiryTime}. Request a new one if needed.
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
