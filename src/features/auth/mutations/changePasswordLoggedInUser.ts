import { resolver } from "@blitzjs/rpc"
import db from "db"
import { ChangePasswordInput } from "~/src/features/auth/schemas"
import { SecurePassword } from "@blitzjs/auth/secure-password"
import login from "~/src/features/auth/mutations/login"



export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(ChangePasswordInput),
  async ({ newPassword, newPasswordConfirmation, currentPassword }, ctx) => {
    const { session: { userId }} = ctx

    const user = await db.user.findUnique({ where: { id: userId }})
    if (!user) throw new Error("User not found!")

    if (newPassword != newPasswordConfirmation) throw new Error("Password do not match!");
    try {
      await SecurePassword.verify(user.hashedPassword, currentPassword);

      const hashedPassword = await SecurePassword.hash(newPassword.trim());

      const updatedUser = await db.user.update({
        where: { id: userId },
        data: { hashedPassword }
      })

      await login({ email: updatedUser.email, password: newPassword}, ctx)
    } catch (error) {
      throw new Error("Current password is incorrect")
    }

})