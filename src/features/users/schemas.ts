import { z } from "zod"

export const UpdateProfileInput = z.object({
  name: z.string(),
  username: z.string().optional(),
  bio: z.string().optional()
})

export type UpdateProfileInputType = z.infer<typeof UpdateProfileInput>