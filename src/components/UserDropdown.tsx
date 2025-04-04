"use client"

import * as React from "react"
import Image from "next/image"

import { authClient } from "@/lib/auth.config"

export function UserDropdown() {
  const user = authClient.useSession().data?.user

  return (
    <div className="hover:bg-secondary flex w-fit items-center gap-2 rounded-md px-3 py-2">
      {user?.image && (
        <>
          <Image
            src={user.image}
            className="bg-sidebar-primary aspect-square size-5 rounded-full"
            alt="Profile"
            width={20}
            height={20}
          />
          <span className="truncate font-medium">
            {user.name.split(" ").at(0)}
          </span>
        </>
      )}
    </div>
  )
}
