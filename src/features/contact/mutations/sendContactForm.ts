import { resolver } from "@blitzjs/rpc"
import db from "db"
import { ContactFormInput } from "~/src/features/contact/forms/schema"
import { sendEmail } from "~/email/sendEmail"
import React from "react"
import { ContactEmail } from "~/email/react-email/emails/contact"

export default resolver.pipe(
  resolver.zod(ContactFormInput),
  resolver.authorize(), async ({ name, email, subject, message }, {}) => {
    const result = await db.contact.create({
      data: {
        name: name,
        email: email,
        subject: subject,
        message: message
      }
    })

    if (result) {
      await sendEmail({
        to: email,
        subject: "Contact",
        text: "",
        react: React.createElement(ContactEmail, {
          props: {
            name: name,
            message: message
          }
        })
      })
    }
  })