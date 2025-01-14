import { generateAppMetadata } from "@/lib/metadata";

export const GLOBAL_ERROR_PAGE_METADATA = generateAppMetadata({
  title: "Error - Estatein",
  description:
    "Oops! Something went wrong. We're working on fixing the issue. Please try refreshing the page.",
  keywords: [],
  metadata: {
    robots: {
      index: false,
      follow: false,
    },
  },
});
