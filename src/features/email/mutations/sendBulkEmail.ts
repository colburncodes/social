import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "~/db"
import { EmailList, EmailTemplate } from "~/src/features/email/types"
import { chunk } from "lodash"
import { isDev } from "~/src/config"
import React from "react"
import DummyEmail from "~/email/react-email/emails/dummy-email"
import { generateUnsubscribeLink } from "~/src/utils/email-utils"
import { Email } from "~/email/types"
import { sendBulkEmail } from "~/email/sendBulkEmail"
import { emailTemplates } from "~/src/features/email/template"

export const Input = z.object({
  list: z.nativeEnum(EmailList),
  template: z.nativeEnum(EmailTemplate)
})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(), async ({ list, template }, { session: { userId } }) => {
  const user = await db.user.findUnique({
    where: { id: userId }
  })

  if (!user) throw new Error("User not found")

    const isEmailTemplate = emailTemplates.find(e => e.value === template)

    if(!isEmailTemplate) throw new Error("Email template not found")

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
      const emails: Email[] = await Promise.all(
        chunk.map(async (user): Promise<Email> => {
          let unsubscribeLink = await generateUnsubscribeLink({
            userId: user.id,
            userEmail: user.email
          });

          return {
            to: user.email,
            subject: `Hey there ${user.name}`,
            text: "",
            react: React.createElement(isEmailTemplate.component, {
              props: {
                name: user.name,
                emailVerifyUrl: "",
                unsubscribeLink
              }
            })
          }
        })
      )

      await sendBulkEmail(emails)
    }
})