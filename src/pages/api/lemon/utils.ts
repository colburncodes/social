import { NextApiRequest } from "next"
import { buffer } from "macro"

export const getRawBody = async (req: NextApiRequest) => {
  const buff = await buffer(req)
  return buff.toString("utf-8")
}