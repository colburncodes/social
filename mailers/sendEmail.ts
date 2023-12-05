import React from 'react';
import { Resend } from 'resend';
import { CreateEmailOptions } from "resend/build/src/emails/interfaces"
import StripeWelcomeEmail from "~/mailers/react-email/emails/stripe-welcome"


const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({subject, to}) => {
  let message:CreateEmailOptions = {
    from: 'onboarding@resend.dev',
    to, // 'colburnsanders@gmail.com'
    subject,
    react: React.createElement(StripeWelcomeEmail, {
      content: "Thank you for registering with Social!",
      btnText: "Confirm account"
    })
  }
  return resend.emails.send(message);
}
