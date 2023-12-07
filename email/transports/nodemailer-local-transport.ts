import * as nodemailer from "nodemailer"
import { env } from "~/src/env.mjs"

let user = env.NODE_MAILER_USER;
let pass = env.NODE_MAILER_PASS;

export const nodemailerAppTransport = nodemailer.createTransport({
  host: "localhost",
  port: 1025,
  auth: {
    user: user,
    pass: pass
  }
})