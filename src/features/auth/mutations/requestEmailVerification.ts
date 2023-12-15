import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"

export const LoginInput = z.object({
  id: z.string()
})

export default resolver.pipe(
  resolver.zod(LoginInput),
  resolver.authorize(), async ({ id }, { userId }) => {
  return db.events.findFirst({ where: { id } })
})