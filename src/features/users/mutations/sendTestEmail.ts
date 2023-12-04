import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"
import { sendEmail } from "~/mailers/sendEmail"

export const EmailInput = z.object({
  to: z.string(),
  subject: z.string(),
  html: z.string()
})

export default resolver.pipe(
  resolver.zod(EmailInput),
  resolver.authorize(),
  async (input, { session: { userId } }) => {
  return sendEmail(input)
})