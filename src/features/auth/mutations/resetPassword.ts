import { hash256 } from "@blitzjs/auth"
import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db from "../../../../db"
import { password, ResetPasswordInput } from "../schemas"
import login from "./login"
import { z } from "zod"
import { TokenType } from "@prisma/client"

export class ResetPasswordError extends Error {
  name = "ResetPasswordError"
  message = "Reset password link is invalid or it has expired."
}

export default resolver.pipe(resolver.zod(ResetPasswordInput), async ({ password, token }, ctx) => {
  const hashedToken = hash256(token)
  const possibleToken = await db.token.findFirst({
    where: { hashedToken, type: TokenType.RESET_PASSWORD },
    include: { user: true },
  })

  if (!possibleToken) throw new ResetPasswordError()
  const savedToken = possibleToken

  await db.token.delete({ where: { id: savedToken.id } })

  if (savedToken.expiresAt < new Date()) throw new ResetPasswordError()

  const hashedPassword = await SecurePassword.hash(password.trim())
  const user = await db.user.update({
    where: { id: savedToken.userId },
    data: { hashedPassword },
  })

  await db.session.deleteMany({ where: { userId: user.id } })

  await login({ email: user.email, password }, ctx)

  return true
})
