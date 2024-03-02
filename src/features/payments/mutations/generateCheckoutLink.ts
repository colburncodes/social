import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"

export const LoginInput = z.object({
  email,
  password: z.string(),
})

export default resolver.pipe(resolver.zod(LoginInput), async ({ id }, { userId } ) => {
  return db.events.findFirst({ where: { id } })
})