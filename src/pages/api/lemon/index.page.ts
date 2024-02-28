import { NextApiRequest, NextApiResponse } from "next"
import { validateLemonSqueezyHook } from "~/src/pages/api/lemon/validateLemonSqueezyHook"
import { getRawBody } from "~/src/pages/api/lemon/utils"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("🍋: hello")

  if (req.method !== "POST") {
    console.log("🍋: method not allowed")
    return res.status(405).json({
      message: "Method not allowed"
    })
  }

  const rawBody = await getRawBody(req)
  const isValidHook = await validateLemonSqueezyHook({ req,rawBody })

  console.log("🍋: isValidHook", isValidHook)

  if (!isValidHook) {
    return res.status(400).json({
      message: "Invalid signature."
    })
  }
  console.log("rawBody", rawBody);
}

export default handler;