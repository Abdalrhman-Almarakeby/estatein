import Link from "next/link";
import { getYear } from "date-fns";

export function Footer() {
  const year = getYear(new Date());

  return (
    <footer className="container mt-12 grid gap-5 py-6">
      <hr />
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div className="mb-4 md:mb-0">
          <Link
            href="/#"
            className="text-lg font-semibold text-purple-light md:text-xl"
          >
            Estatein
          </Link>
        </div>
        <nav className="flex flex-col items-center gap-4 text-white sm:flex-row sm:items-start">
          <Link href="/#">Home</Link>
          <Link href="/legal/terms-of-service#">Terms of Service</Link>
          <Link href="/legal/privacy-policy#">Privacy Policy</Link>
        </nav>
      </div>
      <hr />
      <div className="text-center md:flex md:flex-col md:items-center">
        <p>@{year} Estatein. All Rights Reserved.</p>
        <p aria-label="This content was last updated on May 15, 2024">
          Last updated: <time dateTime="2024-05-15">May 15, 2024</time>
        </p>
      </div>
    </footer>
  );
}
