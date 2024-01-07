import { z } from "zod"

export const UpdateProfileInput = z.object({
  name: z
        .string()
        .min(2, {message: "Name must be at least 2 characters."}),
  username: z
          .string()
          .min(2, { message: "Username must be at least 2 characters."}).optional(),
  bio: z.string().max(160).min(4).optional(),
  avatarImageKey: z.string().optional(),
  coverImageKey: z.string().optional()
})

export type UpdateProfileInputType = z.infer<typeof UpdateProfileInput>