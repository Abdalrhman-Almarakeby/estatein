import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { SignupForm } from "@/containers/dashboard-auth-signup-page/signup-form";
import { SearchParams } from "@/types";
import { authOptions } from "@/lib/auth";

type PageParams = {
  searchParams: SearchParams;
};

export default async function Page({
  searchParams: { callbackUrl },
}: PageParams) {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <>
      <SignupForm
        callbackUrl={typeof callbackUrl === "string" ? callbackUrl : undefined}
      />
    </>
  );
}
