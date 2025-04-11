import React from "react"
import { headers } from "next/headers"

import { auth } from "@/lib/auth"
import { LinkButton } from "@/components/LinkButton"
import { AccountImage } from "@/components/settings/AccountImage"
import { AccountNameForm } from "@/components/settings/AccountNameChange"
import { getAccountDetails } from "@/db/data/user"

export default async function page() {
  const [session, accountDetails] = await Promise.all([
    auth.api.getSession({
      headers: await headers(),
    }),
    getAccountDetails(),
  ])
  return (
    <div className="m-2 flex h-8/12 flex-col rounded-sm">
      <AccountImage />
      <AccountNameForm name={session?.user.name || ""} />
      <div className="my-2 flex flex-col gap-1">
        <h2 className="font-medium">Email</h2>
        <p>{session?.user.email}</p>
        <LinkButton
          href="/settings/account/change-email"
          text="Change email"
          variant="secondary"
          className="mt-1"
        />
      </div>
      <div className="my-2 flex flex-col gap-1">
        <h2 className="font-medium">Password</h2>
        {!accountDetails?.password ? (
          <LinkButton
            href="/settings/account/add-password"
            text="Add password"
            variant="secondary"
          />
        ) : (
          <LinkButton
            href="/settings/account/change-password"
            text="Change password"
            variant="secondary"
          />
        )}
      </div>
      <div className="my-2 flex flex-col gap-1">
        <h2 className="font-medium">Delete</h2>
      </div>
    </div>
  )
}
