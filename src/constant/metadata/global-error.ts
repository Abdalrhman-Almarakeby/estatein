import { generateAppMetadata } from "@/lib/metadata";

export const GLOBAL_ERROR_PAGE_METADATA = generateAppMetadata({
  title: "Error - Estatein",
  description:
    "Oops! Something went wrong. We're working on fixing the issue. Please try refreshing the page.",
  keywords: [
    "Error",
    "Estatein",
    "system error",
    "website issue",
    "technical difficulties",
    "refresh",
  ],
  metadata: {
    robots: {
      index: false,
      follow: false,
    },
  },
});
