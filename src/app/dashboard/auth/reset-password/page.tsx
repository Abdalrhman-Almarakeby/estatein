import { ResetPasswordForm } from "@/containers/dashboard-auth-reset-password-page/reset-password-form";
import { RESET_PASSWORD_PAGE_METADATA } from "@/constant/metadata/reset-password";

export const metadata = RESET_PASSWORD_PAGE_METADATA;

export default function Page() {
  return (
    <>
      <ResetPasswordForm />
    </>
  );
}
