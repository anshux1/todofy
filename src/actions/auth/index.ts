"use server"

import { VerificationEmail } from "@/emails/VerifyEmail"

import { createAction } from "@/lib/create-action"
import { resend } from "@/lib/services/resend"
import { AccessTokenSchema } from "./schema"
import { InputTypeAccessToken, ReturnTypeAccessToken } from "./types"

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

export const sendAccessTokenMail = createAction(
  AccessTokenSchema,
  AccessTokenMail,
)
