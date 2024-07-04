import { env } from "~/src/env.mjs"
import { APP_NAME } from "~/src/config"
import { LogSnag } from "@logsnag/next/server"

const logSnag = new LogSnag({
  token: env.LOGSNAG_API_KEY,
  project: APP_NAME
})

type IdentifyUser = {
  id: string;
  name: string;
  email: string;
  username: string;
}

type PaymentActivity = {
  id: string;
  channel: string;
  event: string;
  notify: boolean;
  plan: string;
  cycle: string;
  trial: boolean;
}

export const sendUserActivity = async (data: IdentifyUser) => {
   return await logSnag.identify({
    user_id: data.id,
    properties: {
      name: data.name,
      email: data.email,
      username: data.username
    }
  })
}

export const sendPaymentActivity = async (data: PaymentActivity) => {
  return await logSnag.track({
    channel: data.channel,
    event: data.event,
    user_id: data.id,
    icon: "💰",
    notify: data.notify,
    tags: {
      plan: data.plan,
      cycle: data.cycle,
      trial: data.trial
    }
  })
}