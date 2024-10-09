"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { ERROR_PAGE_METADATA } from "@/constant";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export const metadata = ERROR_PAGE_METADATA;

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();

  function handleReset() {
    reset();
    router.refresh();
  }

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex h-svh flex-col place-items-center items-center px-4 py-8 text-center lg:px-6 lg:py-16">
      <h1 className="mt-auto grid justify-items-center gap-12 text-4xl font-extrabold tracking-tight text-purple-base lg:text-5xl">
        <AlertTriangle className="size-12" aria-hidden="true" />
        Oops! Something went wrong.
      </h1>
      <p className="mt-3 text-lg font-light">
        We're working on fixing the issue. Please try again later.
      </p>
      <div className="mt-12 grid gap-5 xs:grid-cols-2">
        <button
          className="btn-primary btn-sm flex items-center justify-center gap-1"
          onClick={handleReset}
        >
          <RefreshCw className="mr-2 size-4" aria-hidden="true" />
          Try again
        </button>
        <Link
          href="/"
          className="btn-secondary btn-sm flex items-center justify-center gap-1"
        >
          <Home className="mr-2 size-4" aria-hidden="true" />
          Return to Homepage
        </Link>
      </div>
      <p className="mt-auto text-sm text-gray-medium">
        Error ID: <code className="font-mono">{error.digest || "Unknown"}</code>
      </p>
    </main>
  );
}
