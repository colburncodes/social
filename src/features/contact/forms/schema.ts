import { z } from "zod"

export const ContactFormInput = z.object({
  name: z.string().optional(),
  email: z
    .string().email({message: "Must be valid email address."}).trim(),
  subject: z.string().trim(),
  message: z.string().max(160).min(4)
})

export type ContactFormInputType = z.infer<typeof ContactFormInput>