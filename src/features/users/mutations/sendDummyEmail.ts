import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"
import { sendEmail } from "~/email/sendEmail"
import React from "react"
import DummyEmail from "~/email/react-email/emails/dummy-email"
import { generateUnsubscribeLink } from "~/src/utils/email-utils"

export const Input = z.object({})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(), async ({}, { session: { userId } }) => {
  const user = await db.user.findUnique({
    where: { id: userId }
  })

  if (!user) throw new Error("User not found")

  let unsubscribeLink = await generateUnsubscribeLink({
    userId: user.id,
    userEmail: user.email
  });

  await sendEmail({
    to: user.email,
    subject: "Hey there dummy user!",
    react: React.createElement(DummyEmail, {
      props: {
        name: user.name,
        emailVerifyUrl: "",
        unsubscribeLink
      }
    })
  })
})