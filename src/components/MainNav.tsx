import React from "react"
import Image from "next/image"

import { LinkButton } from "./LinkButton"
import { ModeSwitcher } from "./ModeSwitcher"

export function MainNav() {
  return (
    <div className="border-border bg-background sticky top-0 z-50 border-b">
      <div className="container-wrapper mx-auto flex h-16 items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <Image
            src="https://todofy.blob.core.windows.net/images/todofy-logo.svg"
            className="text-red-800 dark:invert"
            alt="Logo"
            width={30}
            height={30}
          />
          <h1 className='className="scroll-m-20 first:mt-0" text-2xl font-bold tracking-tight'>
            Todofy
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <ModeSwitcher />
          <LinkButton href="/auth/signin" text="Sign In" variant="outline" />
          <LinkButton href="/auth/signup" text="Start for free" />
        </div>
      </div>
    </div>
  )
}
