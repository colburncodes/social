import { z } from "zod"
import { resolver } from "@blitzjs/rpc"
export const Input = z.object({
  id: z.string()
})

export default resolver.pipe(resolver.zod(Input), resolver.authorize("ADMIN"), async ({ id }, { session: {userId} }) => {
  // This throws an error if credentials are invalid
  console.log('Only Admin Privileges')

  return true
})