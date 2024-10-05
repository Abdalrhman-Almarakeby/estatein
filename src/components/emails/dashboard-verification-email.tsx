import {
  Body,
  Button,
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

type DashboardVerificationEmailProps = {
  username: string;
  verificationUrl: string;
};

export const DashboardVerificationEmail = ({
  username,
  verificationUrl,
}: DashboardVerificationEmailProps) => {
  const year = new Date().getFullYear();

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
                registration and gain access, please verify your email address
                by clicking the button below:
              </Text>
              <Section className="my-[40px] text-center">
                <Button
                  className="inline-block rounded-md bg-[#703bf7] px-[20px] py-[12px] text-center text-[16px] font-bold text-white no-underline"
                  href={verificationUrl}
                >
                  Verify Email
                </Button>
              </Section>
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
};
