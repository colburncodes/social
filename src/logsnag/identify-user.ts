import { env } from "~/src/env.mjs"
import { APP_NAME } from "~/src/config"
import { LogSnag } from "@logsnag/next/server"

const logSnag = new LogSnag({
  token: env.LOGSNAG_API_KEY,
  project: APP_NAME
})

interface IdentifyUser {
  name: string;
  email: string;
}

export const sendIdentifyAUser = async (userId: string, data: IdentifyUser) => {
  const userIdentified = await logSnag.identify({
    user_id: userId,
    properties: {
      name: data.name,
      email: data.email
    }
  })
  return userIdentified
}