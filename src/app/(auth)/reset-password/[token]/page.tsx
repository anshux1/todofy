import React from "react"
import { Key } from "lucide-react"

import { ForgotPasswordTemplate } from "@/components/auth/ForgotPasswordTemplate"
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm"

export default function page() {
  return (
    <ForgotPasswordTemplate
      title="Set new password"
      description={
        <>
          {" "}
          Your new password must be different to <br /> previously used
          passwords
        </>
      }
      Icon={Key}
    >
      <ResetPasswordForm />
    </ForgotPasswordTemplate>
  )
}
