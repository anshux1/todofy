import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { featuresData } from "@/constants/features"
import { refreshAtom } from "@/store/atoms"
import { useAtomValue } from "jotai"

import { UserFeature } from "@prisma/client"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { getUserFeatures } from "@/db/data/account"
import { AddTask } from "./task/TaskAddForm"

export function NavMain() {
  const pathname = usePathname()
  const value = useAtomValue(refreshAtom)
  const [sidebarOptions, setSidebarOptions] = useState<UserFeature[]>([])
  useEffect(() => {
    const fetchSidebarOptions = async () => {
      const res = await getUserFeatures()
      setSidebarOptions(
        res.filter((item) => item.shown && item.type === "NAVIGATION"),
      )
    }
    fetchSidebarOptions()
  }, [value])
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild className="p-0">
          <AddTask />
        </SidebarMenuButton>
      </SidebarMenuItem>
      {sidebarOptions.map((item) => {
        const Feat = featuresData.find((feat) => feat.name === item.name)
        return (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild isActive={pathname === Feat?.href}>
              {Feat && Feat.href && (
                <Link href={Feat.href}>
                  <Feat.icon className="text-primary" />
                  <span className="text-primary">{item.name}</span>
                </Link>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}
