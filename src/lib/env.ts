/* eslint-disable n/no-process-env */
/* eslint-disable no-console */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const nonEmptyString = z.string().trim().nonempty();
const emailSchema = z.string().trim().nonempty().email();
const urlSchema = z.string().trim().nonempty().url();

const GMAIL_APP_PASSWORD_LENGTH = 19;

export const env = createEnv({
  server: {
    // Authentication
    NEXTAUTH_SECRET: nonEmptyString,
    NEXTAUTH_URL: urlSchema,

    // Email Configuration
    ADMIN_EMAIL: emailSchema,
    GMAIL_EMAIL: emailSchema,
    GMAIL_APP_PASSWORD: z.string().trim().length(GMAIL_APP_PASSWORD_LENGTH),

    // ReCAPTCHA
    RECAPTCHA_SECRET_KEY: nonEmptyString,

    // Database Configuration
    POSTGRES_URL: urlSchema,
    POSTGRES_PRISMA_URL: urlSchema,
    POSTGRES_URL_NO_SSL: urlSchema,
    POSTGRES_URL_NON_POOLING: urlSchema,
    POSTGRES_USER: nonEmptyString,
    POSTGRES_HOST: nonEmptyString,
    POSTGRES_PASSWORD: nonEmptyString,
    POSTGRES_DATABASE: nonEmptyString,

    // KV Storage
    KV_URL: urlSchema,
    KV_REST_API_URL: urlSchema,
    KV_REST_API_TOKEN: nonEmptyString,
    KV_REST_API_READ_ONLY_TOKEN: nonEmptyString,

    // Redis
    UPSTASH_REDIS_REST_URL: urlSchema,
    UPSTASH_REDIS_REST_TOKEN: nonEmptyString,

    // Storage
    BLOB_READ_WRITE_TOKEN: nonEmptyString,

    // Environment
    NODE_ENV: z.enum(["development", "production"]),
  },

  client: {
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: nonEmptyString,
    NEXT_PUBLIC_VERCEL_URL: z.string().trim().optional(),
    NEXT_PUBLIC_BASE_URL: z.string().trim().optional(),
  },

  onValidationError: (issues) => {
    console.error("❌ Invalid environment variables:", issues);
    process.exit(1);
  },
  onInvalidAccess: (variable) => {
    console.error(
      `❌ Attempted to access server-side environment variable "${variable}" on the client`,
    );
    process.exit(1);
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: {
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
