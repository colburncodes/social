import { NextApiRequest, NextApiResponse } from "next"
import { validateLemonSqueezyHook } from "~/src/pages/api/lemon/validateLemonSqueezyHook"
import getRawBody from "raw-body"
import { LemonEventType } from "~/src/pages/api/lemon/types"
import { onOrderCreated } from "~/src/pages/api/lemon/hooks/onOrderCreated"
import { returnError, returnOkay } from "~/src/pages/api/lemon/utils"


export const config = {
  api: {
    bodyParser: false
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("🍋: hello")

  if (req.method !== "POST") {
    console.log("🍋: method not allowed")
    return res.status(405).json({
      message: "Method not allowed"
    })
  }
  try {
    const rawBody = await getRawBody(req)
    const isValidHook = await validateLemonSqueezyHook({ req, rawBody })

    console.log("🍋: isValidHook", isValidHook)

    if (!isValidHook) {
      return returnError(res)
    }
    console.log("I have a valid hook and can't handle it");
    // @ts-ignore
    const event: ResBody["body"] = JSON.parse(rawBody)
    const eventType: string = event.meta.event_name;

    const handlers = {
      [LemonEventType.OrderCreated]: onOrderCreated
    }

    const foundHandler = handlers[eventType];

    if (foundHandler) {
      try {
        console.log('event found', event)
        await foundHandler({ event })
        returnOkay(res)
      } catch (err) {
        console.log(`🍋: error in handling event`, { eventType, error: err })
        returnError(res)
      }
    } else {
      console.log(`🍋: no handler found for ${eventType} event`)
    }

    console.log('eventType', eventType)
  } catch (e: unknown) {
    if (typeof e === "string") {
      return res.status(400).json({
        message: `Webhook error: ${e}`
      })
    }
    if (e instanceof Error) {
      return res.status(400).json({
        message: `Webhook error: ${e.message}`
      })
    }
  }

}

export default handler;