import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"
import { UpdateProfileInput } from "~/src/features/users/schemas"

export default resolver.pipe(
  resolver.zod(UpdateProfileInput),
  resolver.authorize(), async (input, { session: { userId } }) => {
  return db.user.update({
    where: {
      id: userId
    },
    data: input
  })
})