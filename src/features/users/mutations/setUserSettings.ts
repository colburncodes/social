import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"

export const Input = z.object({
  key: z.string(),
  value: z.boolean()
})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(), async ({ key, value }, { session: { userId } }) => {
  // need to figure out a way to use upsert
    return db.user.update({
      where: { id: userId },
      data: {
        settings: {
          create: [
            { [key]: value }
          ]
        },
      },
      include: {
        settings: true
      }
    })
})