import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"
import { NotFoundError } from "blitz"

export const Input = z.object({})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({}, { session: { userId } }) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      username: true,
      bio: true,
      avatarImageKey: true,
      coverImageKey: true
    }
  })
    
  if (!user) throw new NotFoundError()
  return user
})