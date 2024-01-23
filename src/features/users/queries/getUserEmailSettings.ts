import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"

export const Input = z.object({})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(), async ({}, { session: { userId } }) => {
  return db.user.findUnique({
    where: {
      id: userId
    },
    select: {
      settings: {
        select: {
          settingsEmailMarketing: true,
          settingsEmailProduct: true
        }
      }
    }
  })
})