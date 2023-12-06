import * as nodemailer from "nodemailer"

let user = process.env.NODE_MAILER_USER;
let pass = process.env.NODE_MAILER_PASS;

export const nodemailerAppTransport = nodemailer.createTransport({
  host: "localhost",
  port: 1025,
  auth: {
    user: user,
    pass: pass
  }
})