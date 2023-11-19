import { resolver } from "@blitzjs/rpc"
import db from "~/db"

const getEvents = resolver.pipe(resolver.authorize(), async ({}, { session: { userId } }) => {
  const events = await db.event.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      description: true,
      bookMarked: true,
    },
  })

  if (events == null) return "No events exists!"

  return events
})

export default getEvents
