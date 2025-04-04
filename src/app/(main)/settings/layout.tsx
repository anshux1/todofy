import { ReactNode } from "react"

import { SettingsLinks } from "@/components/ui/link-tabs"

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SettingsLinks />
      {children}
    </>
  )
}
