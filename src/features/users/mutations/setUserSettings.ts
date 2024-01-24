import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"

const allowedKeys = z.enum(["settingsEmailMarketing", "settingsEmailProduct"])
export const Input = z.object({
  key: allowedKeys,
  value: z.boolean()
})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(), async ({ key, value }, { session: { userId } }) => {

    const user = await db.user.findUnique({
      where: {
        id: userId
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
         db.setting.create({
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
      return user.settings.forEach(async (setting) => {
          await db.setting.update({
          where: { id: setting.id },
          data: { [key]: value }
        })
      })
    }
})