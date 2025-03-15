import { headers } from "next/headers"
import Link from "next/link"

import { auth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { AccountDeleteDialog } from "@/components/settings/AccountDeleteDialog"
import { AccountImage } from "@/components/settings/AccountImage"
import { AccountNameForm } from "@/components/settings/AccountNameForm"
import { getAccountDetails } from "@/db/data/account"

export default async function Page() {
  const [session, accountDetails] = await Promise.all([
    auth.api.getSession({
      headers: await headers(),
    }),
    getAccountDetails(),
  ])
  return (
    <div className="m-2 mx-2 flex h-8/12 max-w-3xl flex-col rounded-sm sm:mx-auto sm:w-full">
      <AccountImage />
      <AccountNameForm />
      <div className="my-2 flex flex-col gap-1 px-3.5">
        <h2 className="font-medium">Email</h2>
        <p>{session?.user.email}</p>
        <Link href="/settings/account/change-email">
          <Button variant="secondary" className="mt-1">
            Change mail
          </Button>
        </Link>
      </div>
      <div className="my-2 flex flex-col gap-1 px-3.5">
        <h2 className="font-medium">Password</h2>
        {!accountDetails?.password ? (
          <Link href="/settings/account/add-password">
            <Button variant="secondary" className="mt-1">
              Add Password
            </Button>
          </Link>
        ) : (
          <Link href="/settings/account/change-password">
            <Button variant="secondary" className="mt-1">
              Change Password
            </Button>
          </Link>
        )}
      </div>
      <div className="my-2 flex flex-col gap-1 px-3.5">
        <h2 className="font-medium">Delete</h2>
        <AccountDeleteDialog />
      </div>
    </div>
  )
}
