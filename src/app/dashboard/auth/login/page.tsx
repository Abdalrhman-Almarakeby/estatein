import { LoginForm } from "@/containers/dashboard-auth-login-page/login-form";
import { LOGIN_PAGE_METADATA } from "@/constant/metadata/login";

export const metadata = LOGIN_PAGE_METADATA;

export default function Page() {
  return (
    <>
      <LoginForm />
    </>
  );
}
