import { ForgotPasswordForm } from "@/containers/dashboard-auth-forget-password-page/forget-password-form";
import { FORGOT_PASSWORD_PAGE_METADATA } from "@/constant/metadata/forgot-password";

export const metadata = FORGOT_PASSWORD_PAGE_METADATA;

export default function Page() {
  return (
    <>
      <ForgotPasswordForm />
    </>
  );
}
