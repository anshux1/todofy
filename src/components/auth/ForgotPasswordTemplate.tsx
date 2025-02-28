import React, { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft, LucideIcon } from "lucide-react"

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ForgotPasswordTemplateProps {
  title: string
  description: string | ReactNode
  Icon: LucideIcon
  children: ReactNode
  footerVisible?: boolean
}

export const ForgotPasswordTemplate = ({
  title,
  description,
  children,
  footerVisible = true,
  Icon,
}: ForgotPasswordTemplateProps) => {
  return (
    <div className="-mt-32 flex gap-5">
      <div className="mx-auto w-full max-w-sm">
        <Icon className="size-20 rounded-full bg-sky-500/10 p-5 text-sky-500" />
        <CardHeader className="px-0">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        {children}
        {footerVisible && (
          <Link href="/signin">
            <button className="text-primary mt-5 flex cursor-pointer items-center gap-1 text-sm">
              <ArrowLeft className="size-4" /> Back to Sign in
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}
