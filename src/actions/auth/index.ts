"use server"

import { VerificationEmail } from "@/emails/VerifyEmail"

import { createAction } from "@/lib/create-action"
import { resend } from "@/lib/resend"
import prisma from "@/db"
import {
  AccessTokenSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "./schema"
import {
  InputTypeAccessToken,
  InputTypeForgotPassword,
  InputTypeResetPassword,
  ReturnTypeAccessToken,
  ReturnTypeForgotPassword,
  ReturnTypeResetPassword,
} from "./types"

async function AccessTokenMail({
  name,
  email,
  url,
}: InputTypeAccessToken): Promise<ReturnTypeAccessToken> {
  try {
    const { data, error } = await resend.emails.send({
      from: "Ansh <no-reply@anshux1.me>",
      to: [email],
      subject: "Verify Your Email Address for Appname",
      react: VerificationEmail({ name, verifycationUrl: url }),
    })

    if (error) {
      return { error: error.message }
    }
    return { data: data }
  } catch {
    return { error: "Failed to send email." }
  }
}

export const forgotPasswordHandler = async (
  values: InputTypeForgotPassword,
): Promise<ReturnTypeForgotPassword> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: values.email },
    })
    if (!user) {
      return { error: "No user found with this email" }
    }
    const { error } = await resend.emails.send({
      from: "Ansh <no-reply@anshux1.me>",
      to: [values.email],
      subject: "Verify Your Email Address for Appname",
      react: VerificationEmail({
        name: user.name,
        verifycationUrl: user.email,
      }),
    })

    if (error) {
      return { error: error.message }
    }
    return { data: "Check your email" }
  } catch {
    return { error: "Failed to send email." }
  }
}
export const resetPasswordHandler = async (
  values: InputTypeResetPassword,
): Promise<ReturnTypeResetPassword> => {
  try {
    console.log(values)
    return { data: "Password reset successfully" }
  } catch {
    return { error: "Failed to send email." }
  }
}

export const sendAccessTokenMail = createAction(
  AccessTokenSchema,
  AccessTokenMail,
)

export const forgotPassword = createAction(
  forgotPasswordSchema,
  forgotPasswordHandler,
)

export const resetPassword = createAction(
  resetPasswordSchema,
  resetPasswordHandler,
)
