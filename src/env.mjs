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
    LEMONSQUEEZY_WEBHOOK_SECRET: z.string()
  },
  client: {},
  runtimeEnv: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NODE_MAILER_USER: process.env.NODE_MAILER_USER,
    NODE_MAILER_PASS: process.env.NODE_MAILER_PASS,
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
    LEMONSQUEEZY_WEBHOOK_SECRET: process.env.LEMONSQUEEZY_WEBHOOK_SECRET
  },
});