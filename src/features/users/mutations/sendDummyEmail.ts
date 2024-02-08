import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"
import { sendEmail } from "~/email/sendEmail"
import React from "react"
import DummyEmail from "~/email/react-email/emails/dummy-email"
import { regenerateToken } from "~/src/utils/blitz-utils"
import { TokenType } from "@prisma/client"
import { URL_ORIGIN } from "~/src/config"

export const LoginInput = z.object({})

export default resolver.pipe(
  resolver.zod(LoginInput),
  resolver.authorize(), async ({}, { session: { userId } }) => {
  const user = await db.user.findUnique({
    where: { id: userId }
  })

  if (!user) throw new Error("User not found")

  const token = await regenerateToken({
    tokenType: TokenType.UNSUBSCRIBE_EMAIL,
    userId: user.id,
    userEmail: user.email
  })

  let unsubscribeLink = `${URL_ORIGIN}/unsubscribe?token=${token}`;
  console.log(unsubscribeLink)
  await sendEmail({
    to: user.email,
    subject: "Hey there dummy user!",
    react: React.createElement(DummyEmail, {
      props: {
        name: user.name,
        emailVerifyUrl: user.email,
        unsubscribeLink: unsubscribeLink
      }
    })
  })
})