import { SignupForm } from "@/containers/dashboard-auth-signup-page/signup-form";
import { generateNoneSEOMetadata } from "@/lib/metadata";

export const metadata = generateNoneSEOMetadata({
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
