import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db from "../../../../db"
import { Role } from "../../../../types"
import { SignUpInput } from "../schemas"
import { PrismaError } from "~/src/utils/blitz-utils"
import { sendEmail } from "~/email/sendEmail"
import React from "react"
import Welcome from "~/email/react-email/emails/welcome"


export default resolver.pipe(resolver.zod(SignUpInput), async ({ email, name, password }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())

  const existingUser = await db.user.findFirst({
    where: {
      email:email.toLowerCase().trim( )
    }
  })

  if (existingUser) {
    throw new Error('This email is already registered.')
  }

  try {
    const user = await db.user.create({
      data: {
        email: email.toLowerCase().trim(),
        name,
        hashedPassword,
        role: "USER" 
      },
      select: { id: true, name: true, email: true, role: true },
    })

    if (user) {
      await sendEmail({
        to: user.email,
        subject: "Welcome to Social!",
        react: React.createElement(Welcome, {
          props: {
            name: user.name
          }
        })
      })
      await ctx.session.$create({ userId: user.id, role: user.role as Role })
      return user
    }
  } catch (err) {
    throw new PrismaError(err.message, err.code, err.meta)
  }

  return null;
})
