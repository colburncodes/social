import { Ctx } from "blitz"
import db from "../../../../db"

export default async function getCurrentUser(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const user = await db.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      username: true,
      bio: true,
      email: true,
      role: true,
      emailVerifiedAt: true,
      avatarImageKey: true,
      coverImageKey: true
    },
  })

  return user
}
