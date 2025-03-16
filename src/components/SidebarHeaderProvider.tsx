import React, { ReactNode } from "react"

import { SidebarHeader } from "./ui/sidebar"

export function SidebarHeaderProvider({ children }: { children: ReactNode }) {
  return <SidebarHeader>{children}</SidebarHeader>
}
