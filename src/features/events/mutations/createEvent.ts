import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "~/db"

const Input = z.object({
  title: z.string(),
  description: z.string(),
})

const createEvent = resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ title, description }, { session: { userId } }) => {
    const event = await db.event.create({
      data: {
        title: title,
        description: description,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
    return event
  }
)

export default createEvent
