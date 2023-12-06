import React from 'react';
import { Resend } from 'resend';
import { CreateEmailOptions } from "resend/build/src/emails/interfaces"
import StripeWelcomeEmail from "~/email/react-email/emails/stripe-welcome"
import { isDev } from "~/src/config"
import { render } from "@react-email/render"
import { nodemailerAppTransport } from "~/email/transports/nodemailer-local-transport"


const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({subject, to, react}) => {

  let message: CreateEmailOptions = {
    from: 'onboarding@resend.dev',
    to, // 'colburnsanders@gmail.com'
    subject,
    html: render(react)
  }

  if (isDev) {
    return nodemailerAppTransport.sendMail({
      ...message
    })
  }

  return resend.emails.send({
    ...message,
    react
  });
}
