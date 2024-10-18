import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function Page() {
  const cookieStore = cookies();

  const justSignedUp = cookieStore.get("just-signed-up");
  const email = cookieStore.get("signing-up-email")?.value;

  if (!justSignedUp) {
    redirect("/dashboard/auth/signup");
  }

  return (
    <>
      {false ? (
        <div className="p-5">
          <Loader2 className="mx-auto size-14 animate-spin" />
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">Check Your Email</h1>
            <p className="text-primary font-normal">
              We've sent you a verification link
            </p>
          </div>
          <div className="relative overflow-hidden rounded-lg bg-gray-dark p-6">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-base to-purple-medium" />
            <p className="text-primary font-normal">
              An email has been sent to{" "}
              <span className={cn(email && "font-medium text-white")}>
                {email || "Your email"}
              </span>
              . Click the link in the email to verify your account.
            </p>
          </div>
        </>
      )}
    </>
  );
}
