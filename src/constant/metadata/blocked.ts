import { generateAppMetadata } from "@/lib/metadata";

export const BLOCKED_PAGE_METADATA = generateAppMetadata({
  title: "Rate Limit Exceeded",
  description:
    "You have exceeded the global rate limit for our application. Please try again later. If you believe this is an error, contact our support team.",
  keywords: [],
  metadata: {
    robots: {
      index: false,
      follow: false,
    },
  },
});
