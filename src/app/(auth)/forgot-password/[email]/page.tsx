import React from "react"
import { Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ForgotPasswordTemplate } from "@/components/auth/ForgotPasswordTemplate"

export default async function page({
  params,
}: {
  params: Promise<{ email: string }>
}) {
  const email = decodeURIComponent((await params).email)
  return (
    <ForgotPasswordTemplate
      title="Check your email"
      description={
        <>
          We sent a reset password link to <br />{" "}
          <span className="text-primary">{email}</span>
        </>
      }
      Icon={Mail}
    >
      <Button size="lg" variant="outline" type="submit" className="w-full">
        Open email app
      </Button>
      <div className="mt-3 text-sm">
        Didn&apos;t receive the email?{" "}
        <button className="font-semibold text-sky-500">Click to resend</button>
      </div>
    </ForgotPasswordTemplate>
  )
}
