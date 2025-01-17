import { LoginForm } from "@/containers/dashboard-auth-login-page/login-form";
import { generateDashboardMetadata } from "@/lib/metadata";

export const metadata = generateDashboardMetadata({
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
