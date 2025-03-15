import { CreateEmailResponseSuccess } from "resend"
import z from "zod"

import { ActionState } from "@/lib/create-action"
import {
  AccessTokenSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  setPasswordSchema,
  signinSchema,
  signupSchema,
} from "./schema"

export type InputTypeSignIn = z.infer<typeof signinSchema>
export type InputTypeSignUp = z.infer<typeof signupSchema>

export type InputTypeAccessToken = z.infer<typeof AccessTokenSchema>
export type ReturnTypeAccessToken = ActionState<
  InputTypeAccessToken,
  CreateEmailResponseSuccess | null
>

export type InputTypeForgotPassword = z.infer<typeof forgotPasswordSchema>
export type ReturnTypeForgotPassword = ActionState<
  InputTypeForgotPassword,
  string
>

export type InputTypeResetPassword = z.infer<typeof resetPasswordSchema>
export type ReturnTypeResetPassword = ActionState<
  InputTypeResetPassword,
  string
>

export type InputTypeSetPassword = z.infer<typeof setPasswordSchema>
export type ReturnTypeSetPassword = ActionState<InputTypeSetPassword, string>

export type InputTypeChangePassword = z.infer<typeof changePasswordSchema>
