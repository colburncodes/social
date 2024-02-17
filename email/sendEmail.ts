import { isDev } from "~/src/config"
import { render } from "@react-email/render"
import { nodemailerAppTransport } from "~/email/transports/nodemailer-local-transport"
import { Email } from "~/email/types"
import { resend } from "~/email/resend"
import { CreateEmailOptions } from "resend/build/src/emails/interfaces"

export const DEFAULT_FROM = 'onboarding@resend.dev'
export const sendEmail = async ({subject, to, react}: Email) => {

  let message: CreateEmailOptions = {
    from: DEFAULT_FROM,
    to,
    subject,
    text: ""
  }

  if (isDev) {
    if (!react) throw new Error("The email doesn't have any content")
    const html = render(react)
    return nodemailerAppTransport.sendMail({
      ...message,
      html
    })
  }

  return resend.emails.send({
    ...message,
    react
  });
}
