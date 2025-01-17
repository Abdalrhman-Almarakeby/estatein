import { ForgotPasswordForm } from "@/containers/dashboard-auth-forget-password-page/forget-password-form";
import { generateNonSEOMetadata } from "@/lib/metadata";

export const metadata = generateNonSEOMetadata({
  title: "Forgot Password - Estatein",
  description:
    "Enter your email to receive instructions on resetting your password.",
});

export default function Page() {
  return (
    <>
      <ForgotPasswordForm />
    </>
  );
}
