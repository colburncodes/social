import { resolver } from "@blitzjs/rpc"
import { email } from "../schemas"
import { z } from "zod"
import { Role } from "~/types"
import authenticateUser from "~/src/utils/auth-utils"
import { sendIdentifyAUser } from "~/src/logsnag/identify-user"



export const LoginInput = z.object({
  email,
  password: z.string(),
})

export default resolver.pipe(resolver.zod(LoginInput), async (params, ctx) => {
  const { email, password } = params
  // This throws an error if credentials are invalid
  const user = await authenticateUser(email, password)

  if(!user) throw new Error("User credentials invalid")
  if(!user.name) throw new Error("User name is invalid")

  await sendIdentifyAUser(user.id, {
    name: user.name,
    email: user.email
  })

  await ctx.session.$create({ userId: user.id, role: user.role as Role })

  return user
})
