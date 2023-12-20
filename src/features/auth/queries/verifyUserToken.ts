import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"
import { hash256 } from "@blitzjs/auth"
import { TokenType } from "@prisma/client"

export const Input = z.object({
  token: z.string()
})

export default resolver.pipe(
  resolver.zod(Input), async ({ token }) => {
    const hashedToken = hash256(token)

    const currToken = await db.token.findFirst({
      where: { hashedToken, type: TokenType.VERIFY_EMAIL },
      include: { user: true }
    })

    if(!currToken) throw new Error('Invalid token');

    await db.token.delete({ where: { id: currToken.id }})

    if(currToken.expiresAt < new Date()) throw new Error("Token expired")

    await db.user.update({
      where: { id: currToken.userId },
      data: { emailVerifiedAt: new Date() }
    })

    return true
})