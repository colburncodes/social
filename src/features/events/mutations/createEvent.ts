import { resolver } from "@blitzjs/rpc"
import { z } from "zod"

const Input = z.object({
  title: z.string(),
})

const createEvent = resolver.pipe(resolver.zod(Input), resolver.authorize(), async (params) => {
  const { title } = params
  console.log(title)
  return "Event created"
})

export default createEvent
