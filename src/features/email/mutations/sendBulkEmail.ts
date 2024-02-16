import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "~/db"
import { EmailList } from "~/src/features/email/types"
import { chunk } from "lodash"
import { isDev } from "~/src/config"
import React from "react"
import DummyEmail from "~/email/react-email/emails/dummy-email"
import { generateUnsubscribeLink } from "~/src/utils/email-utils"

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

    //console.log("list is", list)

    const users = await db.user.findMany({
      where: {
        AND: [
           ...(list === EmailList.Product ? [{
              settings: {
                some: {
                  settingsEmailProduct: true
                }
              }
            }] : []),
          ...(list === EmailList.Marketing ? [{
              settings: {
                some: {
                  settingsEmailMarketing: true
                }
              }
            }] : []),
          {
            // not current user
            id: {
              not: user.id
            }
          }
        ]
      }
    })

    // https://resend.com/docs/api-reference/emails/send-batch-emails
    // trigger up to 100 batch emails at once.
    let CHUNK_SIZE = isDev ? 3 : 100
    const chunks = chunk(users, CHUNK_SIZE);

    for (const chunk of chunks) {
      const emails = await Promise.all(
        chunk.map(async (user) => {
          let unsubscribeLink = await generateUnsubscribeLink({
            userId: user.id,
            userEmail: user.email
          });
          return {
            to: user.email,
            subject: `Hey there ${user.name}`,
            react: React.createElement(DummyEmail, {
              props: {
                name: user.name,
                emailVerifyUrl: "",
                unsubscribeLink
              }
            })
          }
        })
      )

      console.log('emails are', emails);
    }


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