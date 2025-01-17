import { VerifyEmailForm } from "@/containers/dashboard-auth-verify-email-page/verify-email-form";
import { generateNonSEOMetadata } from "@/lib/metadata";

export const metadata = generateNonSEOMetadata({
  title: "Verify Email - Estatein",
  description:
    "Enter the 6-digit code sent to your email to verify your account.",
});

export default function Page() {
  return (
    <>
      <VerifyEmailForm />
    </>
  );
}
