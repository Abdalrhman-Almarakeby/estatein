import { generateAppMetadata } from "@/lib/metadata";

export const NOT_FOUND_PAGE_METADATA = generateAppMetadata({
  title: "404 Not Found - Estatein",
  description:
    "Oops! We couldn’t find the page you’re looking for. Head back to the homepage and explore more.",
  keywords: [],
  metadata: {
    robots: {
      index: false,
      follow: false,
    },
  },
});
