import { z } from "zod"
import { UpdateProfileInput } from "~/src/features/users/schemas"

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

export const ForgotPasswordInput = z.object({
  email,
})

export type ForgotPasswordInputType = z.infer<typeof ForgotPasswordInput>

export const ResetPasswordInput = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export type ResetPasswordInputType = z.infer<typeof ResetPasswordInput>