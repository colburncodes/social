import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "~/db"
import { sendEmail } from "~/email/sendEmail"
import React from "react"
import DummyEmail from "~/email/react-email/emails/dummy-email"
import { generateUnsubscribeLink } from "~/src/utils/email-utils"
import { EmailList } from "~/src/features/email/types"

export const Input = z.object({
  list: z.nativeEnum(EmailList)
})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(), async ({ list }, { session: { userId } }) => {
  const user = await db.user.findUnique({
    where: { id: userId }
  })

  if (!user) throw new Error("User not found")

    console.log("list is", list)

  // let unsubscribeLink = await generateUnsubscribeLink({
  //   userId: user.id,
  //   userEmail: user.email
  // });
  //
  // await sendEmail({
  //   to: user.email,
  //   subject: "Hey there dummy user!",
  //   react: React.createElement(DummyEmail, {
  //     props: {
  //       name: user.name,
  //       emailVerifyUrl: "",
  //       unsubscribeLink
  //     }
  //   })
  // })
})