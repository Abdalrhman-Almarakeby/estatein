import { LoginForm } from "@/containers/dashboard-auth-login-page/login-form";
import { generateNonSEOMetadata } from "@/lib/metadata";

export const metadata = generateNonSEOMetadata({
  title: "Login - Estatein",
  description: "Log in to access Estatein dashboard.",
});

export default function Page() {
  return (
    <>
      <LoginForm />
    </>
  );
}
