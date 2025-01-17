import { generateNonSEOMetadata } from "@/lib/metadata";

export const metadata = generateNonSEOMetadata({
  title: "Check Your Email - Estatein",
  description:
    "We've sent a reset link to your email. Check your inbox to continue.",
});

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
