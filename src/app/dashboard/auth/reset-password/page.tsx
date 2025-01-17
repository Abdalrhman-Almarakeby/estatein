import { ResetPasswordForm } from "@/containers/dashboard-auth-reset-password-page/reset-password-form";
import { generateDashboardMetadata } from "@/lib/metadata";

export const metadata = generateDashboardMetadata({
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
