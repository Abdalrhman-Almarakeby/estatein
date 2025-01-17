"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { generateNonSEOMetadata } from "@/lib/metadata";
import "@/styles/global.css";

export const metadata = generateNonSEOMetadata({
  title: "Error - Estatein",
  description:
    "Oops! Something went wrong. We're working on fixing the issue. Please try refreshing the page.",
});

export default function GlobalError() {
  function refresh() {
    window.location.reload();
  }

  return (
    <html lang="en">
      <body className="overflow-x-hidden bg-gray-darkest text-white">
        <main className="grid h-svh place-items-center">
          <section className="mx-auto flex h-full flex-col items-center justify-center px-4 py-8 text-center lg:px-6 lg:py-16">
            <h1 className="grid justify-items-center gap-12 text-4xl font-extrabold tracking-tight text-purple-base lg:text-5xl">
              <AlertTriangle className="size-12" aria-hidden="true" />
              Oops! Something went wrong.
            </h1>
            <p className="mt-3 text-lg font-light">
              We're working on fixing the issue. Please try again later.
            </p>
            <button
              className="btn-primary btn-sm mt-12 flex items-center justify-center gap-1"
              onClick={refresh}
            >
              <RefreshCw className="mr-2 size-4" aria-hidden="true" />
              Refresh
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
