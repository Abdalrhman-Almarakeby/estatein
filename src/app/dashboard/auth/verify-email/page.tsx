import { VerifyEmailForm } from "@/containers/dashboard-auth-verify-email-page/verify-email-form";
import { VERIFY_EMAIL_PAGE_METADATA } from "@/constant/metadata/verify-email";

export const metadata = VERIFY_EMAIL_PAGE_METADATA;

export default function Page() {
  return (
    <>
      <VerifyEmailForm />
    </>
  );
}
