"use client";

import Link from "next/link";
import { NOT_FOUND_PAGE_METADATA } from "@/constant";

export const metadata = NOT_FOUND_PAGE_METADATA;

export default function NotFound() {
  return (
    <main className="grid h-svh place-items-center">
      <section className="mx-auto flex h-full flex-col items-center justify-center px-4 py-8 text-center lg:px-6 lg:py-16">
        <h1 className="text-7xl font-extrabold tracking-tight text-purple-base lg:text-9xl">
          404
        </h1>
        <p className="mt-8 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Something’s missing.
        </p>
        <p className="mt-3 text-lg font-light text-gray-light">
          Oops! We couldn’t find the page you’re looking for. Head back to the
          dashboard homepage.
        </p>

        <Link
          href="/dashboard"
          className="btn-primary btn-sm mt-12 flex items-center justify-center gap-1"
        >
          Return to Dashboard Homepage
        </Link>
      </section>
    </main>
  );
}
