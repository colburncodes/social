import { Email } from "~/email/types"
import { isDev } from "~/src/config"
import { DEFAULT_FROM, sendEmail } from "~/email/sendEmail"
import { resend } from "~/email/resend"

type EmailResponse = Email & { text: string, from: string }
export const sendBulkEmail = async (emails: Email[]) => {

  if(isDev) {
    for (const email of emails) {
      await sendEmail(email)
    }
  } else {
    let mappedEmails: EmailResponse[] = emails.map((email) => ({
      ...email,
      from: DEFAULT_FROM,
      text: ""
    }))

    const maxEmailLimit = 100;
    if (mappedEmails.length > maxEmailLimit) {
      throw new Error(`You can't send more than ${maxEmailLimit} emails at once`)
    }

    return resend.batch.send(mappedEmails)
  }
}