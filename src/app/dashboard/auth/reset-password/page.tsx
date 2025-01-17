import { ResetPasswordForm } from "@/containers/dashboard-auth-reset-password-page/reset-password-form";
import { generateNoneSEOMetadata } from "@/lib/metadata";

export const metadata = generateNoneSEOMetadata({
  title: "Reset Password - Estatein",
  description: "Enter a new password to reset your password.",
});

export default function Page() {
  return (
    <>
      <ResetPasswordForm />
    </>
  );
}
