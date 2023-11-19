import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "~/db"

const Input = z.object({
  id: z.string(),
})

const toggleEvent = resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ id }, { session: { userId } }) => {
    const event = await db.event.findFirst({
      where: {
        id,
        userId,
      },
      select: {
        bookMarked: true,
      },
    })

    if (!event) throw new Error("Event not found!")

    return db.event.update({
      where: {
        id,
      },
      data: {
        bookMarked: !event.bookMarked,
      },
    })
  }
)

export default toggleEvent
