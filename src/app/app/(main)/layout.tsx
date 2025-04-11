"use client"

import React from "react"
import { usePathname } from "next/navigation"

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  console.log(pathname)

  return <div className="w-full pt-10">{children}</div>
}
