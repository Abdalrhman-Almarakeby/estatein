import { SignupForm } from "@/containers/dashboard-auth-signup-page/signup-form";
import { SIGNUP_PAGE_METADATA } from "@/constant/metadata/signup";

export const metadata = SIGNUP_PAGE_METADATA;

export default function Page() {
  return (
    <>
      <SignupForm />
    </>
  );
}
