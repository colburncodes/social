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
  }).optional()
})

export type SignUpInputType = z.infer<typeof SignUpInput>

export const LoginInput = z.object({
  email,
  password
})

export type LoginInputType = z.infer<typeof LoginInput>

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

export const ChangePasswordInput = z
  .object({
    currentPassword: password,
    newPassword: password,
    newPasswordConfirmation: password,
  })
  .refine((data) => data.newPassword === data.newPasswordConfirmation, {
    message: "Passwords don't match",
    path: ["newPasswordConfirmation"], // set the path of the error
  })

export type ChangePasswordInputType = z.infer<typeof ChangePasswordInput>