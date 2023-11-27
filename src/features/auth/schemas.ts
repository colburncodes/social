import { z } from "zod"

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

export const password = z
  .string()
  .min(10)
  .max(100)
  .transform((str) => str.trim())

export const SignUpInput = z.object({
  email,
  password,
  name: z.string(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to terms and conditions"
  })
})


export const LoginInput = z.object({
  email,
  password
})