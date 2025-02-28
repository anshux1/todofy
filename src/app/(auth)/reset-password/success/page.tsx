import React from "react"
import { CircleCheckBig } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ForgotPasswordTemplate } from "@/components/auth/ForgotPasswordTemplate"

export default function page() {
  return (
    <ForgotPasswordTemplate
      title="Password Reset"
      description={
        <>
          {" "}
          Your new password must be different to <br /> previously used
          passwords
        </>
      }
      Icon={CircleCheckBig}
    >
      <Button size="lg" type="submit" className="w-full">
        Continue
      </Button>
    </ForgotPasswordTemplate>
  )
}
