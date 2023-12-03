import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"
import { NotFoundError } from "blitz"

export const LoginInput = z.object({
 username: z.string()
})

export default resolver.pipe(resolver.zod(LoginInput), async ({ username }, { session: userId }) => {
  const user = await db.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      username: true,
      bio: true
    }
  })

  if (!user) throw new NotFoundError()
  return user
})