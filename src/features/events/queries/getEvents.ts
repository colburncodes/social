import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "~/db"

const Input = z.object({
  search: z.string().optional(),
})

const getEvents = resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({}, { session: { userId } }) => {
    const events = await db.event.findMany({
      where: {
        userId,
      },
    })
    if (events == null) return "No events exists!"

    return events
  }
)

export default getEvents
