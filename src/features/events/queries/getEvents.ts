import { resolver } from "@blitzjs/rpc"
import { z } from "zod"

const Input = z.object({
  search: z.string().optional(),
})

const getEvents = resolver.pipe(resolver.zod(Input), resolver.authorize(), async ({ search }) => {
  const events = [
    { id: 1, title: "Social", description: "Details", createdAt: new Date().toDateString() },
    { id: 2, title: "Stl Code", description: "Code", createdAt: new Date().toDateString() },
    { id: 3, title: "React", description: "Suspense React", createdAt: new Date().toDateString() },
  ]
  return events
})

export default getEvents
