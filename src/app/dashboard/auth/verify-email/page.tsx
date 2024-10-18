import Link from "next/link";
import { redirect } from "next/navigation";
import { SearchParams } from "@/types";
import { verifyEmail } from "@/lib/services";

type PageParams = {
  searchParams: SearchParams;
};

export default async function Page({ searchParams: { token } }: PageParams) {
  const { success, message } =
    token && !!token && typeof token === "string"
      ? await verifyEmail(token)
      : { success: false, message: "" };

  if (success) {
    redirect("/dashboard");
  }

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Verification Failed</h1>
        <p className="text-primary font-normal">
          We encountered an issue while verifying your email
        </p>
      </div>
      <div className="relative overflow-hidden rounded-lg bg-gray-dark p-6">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-base to-purple-medium" />
        <p className="text-primary font-normal">
          {!message || "The verification link is invalid or has expired."}
        </p>
      </div>
      <Link
        href="/dashboard/auth/signup"
        className="btn-primary btn-sm mx-auto w-fit px-6 py-2 text-base"
      >
        Try Signing up again
      </Link>
    </>
  );
}
