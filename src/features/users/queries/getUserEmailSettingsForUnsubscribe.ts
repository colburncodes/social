import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"
import { hash256 } from "@blitzjs/auth"
import { TokenType } from "@prisma/client"

export const Input = z.object({
  token: z.string().optional()
})

export default resolver.pipe(resolver.zod(Input), async ({ token }) => {
    const hashedToken = hash256(token);
    console.log(hashedToken)
    const possibleToken = await db.token.findFirst({
      where: { hashedToken, type: TokenType.UNSUBSCRIBE_EMAIL },
      include: {
        user: {
          select: {
            settings: {
              select: {
                settingsEmailMarketing: true,
                settingsEmailProduct: true
              }
            }
          }
        }
      }
    })

    let isTokenMatch = hashedToken === possibleToken?.hashedToken
    console.log(isTokenMatch)
    if (!possibleToken) throw new Error("Token not found")

    if (possibleToken.expiresAt < new Date()) throw new Error("Token expired")

  return possibleToken.user
})