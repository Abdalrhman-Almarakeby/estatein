import { AlertTriangle } from "lucide-react";
import { generateNonSEOMetadata } from "@/lib/metadata";

export const metadata = generateNonSEOMetadata({
  title: "Rate Limit Exceeded",
  description:
    "You have exceeded the global rate limit for our application. Please try again later. If you believe this is an error, contact our support team.",
});

export default function Page() {
  return (
    <main className="mx-auto flex h-svh flex-col place-items-center items-center px-4 py-8 text-center lg:px-6 lg:py-16">
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="relative text-4xl font-extrabold tracking-tight text-purple-base lg:text-5xl">
          <AlertTriangle
            className="absolute bottom-[calc(100%+30px)] left-1/2 size-12 -translate-x-1/2 xl:size-14"
            aria-hidden="true"
          />
          Rate Limit Exceeded
        </h1>
        <p className="mt-3 text-lg font-light">
          You have exceeded the global rate limit for our application. Please
          try again later.
        </p>
      </div>
      <p className="mt-auto text-sm text-gray-medium xl:text-base">
        If you believe this is an error, please contact our support team.
      </p>
    </main>
  );
}
