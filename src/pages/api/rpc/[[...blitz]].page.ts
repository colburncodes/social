import { rpcHandler } from "@blitzjs/rpc"
import { api } from "src/blitz-server"
import { errorFormatter } from "~/src/utils/blitz-utils"

export default api(rpcHandler({ formatError: errorFormatter }))
