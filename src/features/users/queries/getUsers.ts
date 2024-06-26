import { resolver } from "@blitzjs/rpc"
import db from "db"


export default resolver.pipe(
  resolver.authorize("ADMIN"), async ({}, {}) => {
  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      role: true,
      bio: true,
      onBoarded: true,
      settings: {
        select: {
          id: true,
          settingsEmailMarketing: true,
          settingsEmailProduct: true
        }
      }
    }
  });

  if (users == null) return "No users exist";

  return users;
})