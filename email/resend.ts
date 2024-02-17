import { Resend } from "resend"
import { env } from "~/src/env.mjs"

export const resend = new Resend(env.RESEND_API_KEY);