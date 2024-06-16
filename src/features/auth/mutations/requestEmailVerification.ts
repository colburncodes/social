import { resolver } from "@blitzjs/rpc"
import db from "db"
import { sendEmail } from "~/email/sendEmail"
import React from "react"
import { regenerateToken } from "~/src/utils/blitz-utils"
import { TokenType } from "@prisma/client"
import { URL_ORIGIN } from "~/src/config"
import VerifyEmailTemplate from "~/email/react-email/emails/verify-email"

export const getEmailVerificationLink = async ({ userId, userEmail }): Promise<string> => {
  const token = await regenerateToken({
    userId,
    userEmail,
    tokenType: TokenType.VERIFY_EMAIL
  })

  const link = `${URL_ORIGIN}/auth/verify-email?token=${token}`;
  return link
}
export const sendVerificationEmail = async ({ userId, userEmail }): Promise<void> => {
  const emailVerifyUrl = await getEmailVerificationLink({
    userId,
    userEmail
  })

  await sendEmail({
    to: userEmail,
    subject: "Please verify your email address",
    text: "",
    react: React.createElement(VerifyEmailTemplate, {
      props: {
        emailVerifyUrl
      }
    })
  })
}

export default resolver.pipe(
  resolver.authorize(), async (_, { session: { userId } }) => {
    const user = await db.user.findFirst({
      where: { id: userId }
    })
    if (!user) throw new Error("User not found!")

    await sendVerificationEmail({
      userId: user.id,
      userEmail: user.email
    })

    return true
})