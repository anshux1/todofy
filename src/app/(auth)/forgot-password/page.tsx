import React from "react"
import { Key } from "lucide-react"

import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm"
import { ForgotPasswordTemplate } from "@/components/auth/ForgotPasswordTemplate"

export default function page() {
  return (
    <ForgotPasswordTemplate
      title="Forgot Password?"
      description={
        <>
          To reset your password, please enter the email address of your{" "}
          <span className="font-semibold text-sky-500">Todofy</span> account.
        </>
      }
      Icon={Key}
    >
      <ForgotPasswordForm />
    </ForgotPasswordTemplate>
  )
}
