import { CreateEmailResponseSuccess } from "resend"
import z from "zod"

import { ActionState } from "@/lib/create-action"
import { AccessTokenSchema, signinSchema, signupSchema } from "./schema"

export type InputTypeSignIn = z.infer<typeof signinSchema>
export type InputTypeSignUp = z.infer<typeof signupSchema>

export type InputTypeAccessToken = z.infer<typeof AccessTokenSchema>
export type ReturnTypeAccessToken = ActionState<
  InputTypeAccessToken,
  CreateEmailResponseSuccess | null
>
