import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { featuresData } from "@/constants/features"
import { refreshAtom } from "@/store/atoms"
import { useAtomValue } from "jotai"
import { Plus } from "lucide-react"

import { UserFeature } from "@prisma/client"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { getUserFeatures } from "@/db/data/account"
import { TaskAddDialog } from "./task/TaskAddDialog"

export function NavMain() {
  const pathname = usePathname()
  const value = useAtomValue(refreshAtom)
  const [sidebarOptions, setSidebarOptions] = useState<UserFeature[]>([])
  useEffect(() => {
    const fetchSidebarOptions = async () => {
      const res = await getUserFeatures()
      const newSidebarOptions = res.filter(
        (item) => item.shown && item.type === "NAVIGATION",
      )
      setSidebarOptions(newSidebarOptions)
      console.log("sidebarOptions", newSidebarOptions)
    }
    fetchSidebarOptions()
  }, [value])
  return (
    <SidebarMenu>
      <TaskAddDialog>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Plus className="text-primary size-4" />
            <span className="text-primary">Add task</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </TaskAddDialog>
      {sidebarOptions.map((item) => {
        const Feat = featuresData.find((feat) => feat.name === item.name)
        return (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild isActive={pathname === Feat?.href}>
              {Feat && Feat.href && (
                <Link href={Feat.href}>
                  <Feat.icon className="text-primary size-4" />
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
