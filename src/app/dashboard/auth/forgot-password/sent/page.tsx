import { FORGOT_PASSWORD_SENT_PAGE_METADATA } from "@/constant/metadata/forgot-password-sent";

export const metadata = FORGOT_PASSWORD_SENT_PAGE_METADATA;

export default function Page() {
  return (
    <>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Check Your Email</h1>
        <p className="text-primary text-base font-normal">
          If an account with this email exists, we've sent a link to reset your
          password. Please check your inbox and follow the instructions to
          complete the process.
        </p>
      </div>
    </>
  );
}
