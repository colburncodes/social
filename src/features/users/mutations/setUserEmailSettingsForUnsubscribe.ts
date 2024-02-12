import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"
import { hash256 } from "@blitzjs/auth"
import { TokenType } from "@prisma/client"

const allowedKeys = z.enum(["settingsEmailMarketing", "settingsEmailProduct"])
export const Input = z.object({
  key: allowedKeys,
  value: z.boolean(),
  token: z.string()
})

// only for logged out users who are managing their email settings
export default resolver.pipe(
  resolver.zod(Input),
  async ({ key, value, token }, ctx) => {

    const hashedToken = hash256(token);
    const possibleToken = await db.token.findFirst({
      where: { hashedToken, type: TokenType.UNSUBSCRIBE_EMAIL }
    })

    if (!possibleToken) throw new Error("Token not found!")
    if (possibleToken.expiresAt < new Date()) throw new Error("Token expired")

    const user = await db.user.findUnique({
      where: {
        id: possibleToken.userId
      },
      select: {
        id: true,
        settings: {
          select: {
            id: true
          }
        }
      },
    });

    if (!user) throw new Error("User not found")

    if (user.settings.length === 0) {
      await db.setting.create({
        data: {
          user: {
            connect: {
              id: user.id
            }
          },
          [key]: value
        },
        include: {
          user: true
        }
      })
    } else {
      user.settings.forEach(async (setting) => {
        await db.setting.update({
          where: { id: setting.id },
          data: { [key]: value }
        })
      })
    }
    return user;
  })