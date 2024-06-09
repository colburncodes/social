import {isDev, isStaging} from "~/src/config"
import { render } from "@react-email/render"
import { nodemailerAppTransport } from "~/email/transports/nodemailer-local-transport"
import { Email } from "~/email/types"
import { resend } from "~/email/resend"
import { CreateEmailOptions } from "resend/build/src/emails/interfaces"
import {nodemailerMailTrapTransport} from "~/email/transports/nodemailer-mailtrap-transport";
import emailConfig from  "~/email/config"

export const DEFAULT_FROM = 'onboarding@resend.dev';

const emailClients = {
  dev: emailConfig.appTransport,
  staging: emailConfig.mailTrapTransport
}
// TODO: Refactor later to break out of branching logic.
export const sendEmail = async ({subject, to, react}: Email) => {

  let message: CreateEmailOptions = {
    from: DEFAULT_FROM,
    to,
    subject,
    text: ""
  }

  if (!react) throw new Error("The email doesn't have any content")
  const html = render(react)

  if (isDev) {
    return nodemailerAppTransport.sendMail({
      ...message,
      html
    })
  }

  if (isStaging) {
    return nodemailerMailTrapTransport.sendMail({
      ...message,
      html
    })
  }

  return resend.emails.send({
    ...message,
    react
  });
}
