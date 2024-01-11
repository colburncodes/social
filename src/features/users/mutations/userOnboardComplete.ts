import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"

export const LoginInput = z.object({})

export default resolver.pipe(
  resolver.zod(LoginInput),
  resolver.authorize(), async ({}, { session: { userId } }) => {
  return db.user.update({
    where: { id: userId },
    data: { onBoarded: true }
  })
})