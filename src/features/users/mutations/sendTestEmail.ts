import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"
import { sendEmail } from "~/email/sendEmail"

export const EmailInput = z.object({
  to: z.string(),
  subject: z.string(),
})

export default resolver.pipe(
  resolver.zod(EmailInput),
  resolver.authorize(),
  async (input, { session: { userId } }) => {
  return sendEmail(input)
})