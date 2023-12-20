import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"
import { NotFoundError } from "blitz"

export const LoginInput = z.object({
 username: z.string()
})

export default resolver.pipe(resolver.zod(LoginInput), async ({ username }) => {
  const user = await db.user.findUnique({
    where: { username: username.toLowerCase() },
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