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
  Text,
} from "@react-email/components";

type DashboardVerificationEmailProps = {
  username: string;
  verificationUrl: string;
};

// TODO: Fix the email template, the styles are broken
export function DashboardVerificationEmail({
  username,
  verificationUrl,
}: DashboardVerificationEmailProps) {
  const year = new Date().getFullYear();

  return (
    <Html>
      <Head />
      <Preview>Verify your email for dashboard access</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Email Verification</Heading>
          <Text style={text}>Hello {username},</Text>
          <Text style={text}>
            Thank you for signing up for our dashboard. To complete your
            registration and gain access, please verify your email address by
            clicking the button below:
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={verificationUrl}>
              Verify Email
            </Button>
          </Section>
          <Text style={text}>
            If you didn't request this verification, please ignore this email.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>© {year} Estatein. All rights reserved.</Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#141414",
  fontFamily:
    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "560px",
};

const h1 = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
};

const text = {
  color: "#999999",
  fontSize: "14px",
  lineHeight: "24px",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "30px 0",
};

const button = {
  backgroundColor: "#703bf7",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
};

const hr = {
  borderColor: "#262626",
  margin: "20px 0",
};

const footer = {
  color: "#8254f8",
  fontSize: "12px",
  lineHeight: "24px",
  textAlign: "center" as const,
};
