import Link from "next/link"
import { featuresIcons } from "@/constants/quick-add"

import { getUserFeatures } from "@/db/data/user"

export async function SidebarFeatures() {
  const features = await getUserFeatures("NAVIGATION", true)
  return (
    <div className="flex flex-col gap-1">
      {features.map((item, index) => {
        const Icon = featuresIcons.get(item.name)
        return (
          <Link href={item.id} key={index}>
            <div key={index} className="flex flex-col gap-1">
              <h4 className="hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium">
                {Icon && (
                  <Icon className="text-primary size-5 stroke-[1.3] font-thin" />
                )}{" "}
                <p>{item.name} </p>
              </h4>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
