import { SignupForm } from "@/containers/dashboard-auth-signup-page/signup-form";
import { generateNonSEOMetadata } from "@/lib/metadata";

export const metadata = generateNonSEOMetadata({
  title: "Sign Up - Estatein",
  description: "Create an account to access Estatein dashboard.",
});

export default function Page() {
  return (
    <>
      <SignupForm />
    </>
  );
}
