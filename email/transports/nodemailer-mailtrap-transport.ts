import * as nodemailer from "nodemailer"
import { env } from "~/src/env.mjs"

let user = env.MAILTRAP_USERNAME;
let pass = env.MAILTRAP_PASSWORD;

export const nodemailerMailTrapTransport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user,
        pass
    }
})