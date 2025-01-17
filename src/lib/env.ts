/* eslint-disable n/no-process-env */

/* eslint-disable no-console */
import { createEnv } from "@t3-oss/env-nextjs";
import { z, ZodError } from "zod";

const nonEmptyString = z.string().trim().min(1);
const emailSchema = z.string().trim().min(1).email();
const urlSchema = z.string().trim().min(1).url();

export const env = createEnv({
  server: {
    // Authentication
    NEXTAUTH_SECRET: nonEmptyString,
    NEXTAUTH_URL: urlSchema,

    // Email Configuration
    ADMIN_EMAIL: emailSchema,
    GMAIL_EMAIL: emailSchema,
    GMAIL_APP_PASSWORD: z.string().trim().length(19),

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

  onValidationError: (error: ZodError) => {
    console.error(
      "❌ Invalid environment variables:",
      error.flatten().fieldErrors,
    );
    process.exit(1);
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD,
    GMAIL_EMAIL: process.env.GMAIL_EMAIL,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    POSTGRES_URL: process.env.POSTGRES_URL,
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
    POSTGRES_URL_NO_SSL: process.env.POSTGRES_URL_NO_SSL,
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
    KV_URL: process.env.KV_URL,
    KV_REST_API_URL: process.env.KV_REST_API_URL,
    KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
    KV_REST_API_READ_ONLY_TOKEN: process.env.KV_REST_API_READ_ONLY_TOKEN,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
    NODE_ENV: process.env.NODE_ENV,
  },
});
