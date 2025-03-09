import { createJiti } from "jiti";
import { fileURLToPath } from "url";

// Create a Jiti instance to enable importing TypeScript files during both build and runtime
// https://github.com/unjs/jiti
const jiti = createJiti(fileURLToPath(import.meta.url));

// Import and validate environment variables before the app starts
// This ensures the app won't run if required env variables are missing or invalid
// https://env.t3.gg/docs/nextjs
await jiti.import("./src/lib/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true, // Enable type-safe routing
    webpackBuildWorker: true, // Use worker threads for webpack builds
    parallelServerBuildTraces: true, // Enable parallel processing for server traces
    parallelServerCompiles: true, // Enable parallel server-side compilation
  },
  logging: {
    fetches: {
      fullUrl: true, // Log complete URLs for debugging fetch requests
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos", // Allow images from picsum.photos
      },
      {
        protocol: "https",
        hostname: "wumjlbmt5kom556f.public.blob.vercel-storage.com", // Allow blob storage images
      },
    ],
  },
  compiler: {
    // Remove console.log statements in production
    // eslint-disable-next-line n/no-process-env
    removeConsole: process.env.NODE_ENV === "production",
  },
  webpack(config) {
    // Configure webpack to handle SVG files properly
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    );

    // Add specialized rules for SVG handling
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // Handle SVGs with ?url query
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ["@svgr/webpack"], // Transform SVGs into React components
      },
    );

    // Prevent default handling of SVG files
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
