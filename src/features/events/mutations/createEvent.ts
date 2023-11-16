import { resolver } from "@blitzjs/rpc"
import { z } from "zod"

const Input = z.object({
  title: z.string(),
})

const createEvent = resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ title }, { session: { userId } }) => {
    console.log(`Creating an event with title: ${title} for user ${userId}`)
    return "Event created"
  }
)

export default createEvent
