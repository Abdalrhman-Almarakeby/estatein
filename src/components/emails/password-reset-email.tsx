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

type PasswordResetEmailProps = {
  username: string;
  resetLink: string;
};

export function PasswordResetEmail({
  username,
  resetLink,
}: PasswordResetEmailProps) {
  const year = new Date().getFullYear();

  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] font-sans">
          <Container className="mx-auto w-full max-w-[560px]">
            <Section className="overflow-hidden rounded-lg bg-[#141414]">
              <Heading className="my-[30px] px-[40px] text-center text-[28px] font-bold leading-[32px] text-white">
                Password Reset
              </Heading>
              <Text className="mb-[20px] px-[40px] text-[16px] leading-[26px] text-[#e0e0e0]">
                Hello {username},
              </Text>
              <Text className="mb-[20px] px-[40px] text-[16px] leading-[26px] text-[#e0e0e0]">
                We received a request to reset your password for your account.
                If you didn't make this request, you can safely ignore this
                email.
              </Text>
              <Section className="my-[40px] text-center">
                <Button
                  href={resetLink}
                  className="inline-block rounded bg-[#703bf7] px-[30px] py-[15px] text-[16px] font-bold text-white no-underline"
                >
                  Reset Your Password
                </Button>
              </Section>
              <Text className="mb-[20px] px-[40px] text-[16px] leading-[26px] text-[#e0e0e0]">
                If the button above doesn't work, you can also copy and paste
                the following link into your browser:
              </Text>
              <Text className="mb-[20px] px-[40px] text-[14px] leading-[24px] text-[#8254f8]">
                <Link href={resetLink} className="text-[#8254f8]">
                  {resetLink}
                </Link>
              </Text>
              <Text className="mb-[20px] px-[40px] text-[16px] leading-[26px] text-[#e0e0e0]">
                This password reset link will expire in 1 hours for security
                reasons. If you need to reset your password after that, please
                request a new reset link.
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
