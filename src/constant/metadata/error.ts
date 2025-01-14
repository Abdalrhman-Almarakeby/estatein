import { generateAppMetadata } from "@/lib/metadata";

export const ERROR_PAGE_METADATA = generateAppMetadata({
  title: "Error - Estatein",
  description:
    "Oops! Something went wrong. We're working on fixing the issue. Please try again later.",
  keywords: [],
  metadata: {
    robots: {
      index: false,
      follow: false,
    },
  },
});
