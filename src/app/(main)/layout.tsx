import { ReactNode } from "react"

import { SettingsLinks } from "@/components/ui/link-tabs"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarBreadcrum } from "@/components/SideBarBreadcrums"

export default function layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarBreadcrum />
        <SettingsLinks />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
