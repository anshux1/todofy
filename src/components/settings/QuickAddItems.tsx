import React from "react"
import { featuresIcons } from "@/constants/quick-add"

import { UserFeature } from "@prisma/client"
import { Separator } from "@/components/ui/separator"
import { QuickAddToggle } from "./QuickAddToggle"

interface QuickAddItemsProps {
  data: UserFeature
  lastIndex: boolean
}

export const QuickAddItems = ({ data, lastIndex }: QuickAddItemsProps) => {
  const Icon = featuresIcons.get(data.name)
  return (
    <>
      <div className="bg-card flex w-72 cursor-pointer items-center gap-2 rounded-sm px-3 py-2">
        <QuickAddToggle
          type={data.type}
          featureId={data.id}
          shown={data.shown}
        />
        {Icon && (
          <Icon className="text-primary size-5 stroke-[1.3] font-thin" />
        )}
        <p className="ml-2 capitalize">{data.name}</p>
      </div>
      {lastIndex && (
        <Separator className="mr-2 data-[orientation=vertical]:h-4" />
      )}
    </>
  )
}
