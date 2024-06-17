// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    RESEND_API_KEY: z.string().min(1),
    NODE_MAILER_USER: z.string().optional(),
    NODE_MAILER_PASS: z.string().optional(),
    UPLOADTHING_SECRET: z.string().min(1),
    UPLOADTHING_APP_ID: z.string().min(1),
    LEMONSQUEEZY_WEBHOOK_SECRET: z.string(),
    LEMONSQUEEZY_API_KEY: z.string(),
    LEMONSQUEEZY_STORE_ID: z.string(),
    LEMONSQUEEZY_VARIANT_ID: z.string(),
    LOGSNAG_API_KEY: z.string(),
    MAILTRAP_USERNAME: z.string().optional(),
    MAILTRAP_PASSWORD: z.string().optional(),
    NEXT_PUBLIC_GITHUB_AUTH_CLIENT_ID: z.string().min(1),
    NEXT_PUBLIC_GITHUB_AUTH_SECRET_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_LOGSNAG_CLIENT_TOKEN: z.string()
  },
  runtimeEnv: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NODE_MAILER_USER: process.env.NODE_MAILER_USER,
    NODE_MAILER_PASS: process.env.NODE_MAILER_PASS,
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
    LEMONSQUEEZY_WEBHOOK_SECRET: process.env.LEMONSQUEEZY_WEBHOOK_SECRET,
    LEMONSQUEEZY_API_KEY: process.env.LEMONSQUEEZY_API_KEY,
    LEMONSQUEEZY_STORE_ID: process.env.LEMONSQUEEZY_STORE_ID,
    LEMONSQUEEZY_VARIANT_ID: process.env.LEMONSQUEEZY_VARIANT_ID,
    LOGSNAG_API_KEY: process.env.LOGSNAG_API_KEY,
    NEXT_PUBLIC_LOGSNAG_CLIENT_TOKEN: process.env.NEXT_PUBLIC_LOGSNAG_CLIENT_TOKEN,
    MAILTRAP_USERNAME: process.env.MAILTRAP_USERNAME,
    MAILTRAP_PASSWORD: process.env.MAILTRAP_PASSWORD,
    NEXT_PUBLIC_GITHUB_AUTH_CLIENT_ID: process.env.NEXT_PUBLIC_GITHUB_AUTH_CLIENT_ID,
    NEXT_PUBLIC_GITHUB_AUTH_SECRET_KEY: process.env.NEXT_PUBLIC_GITHUB_AUTH_SECRET_KEY,
  },
});