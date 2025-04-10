import React from "react"

import { UserFeature } from "@prisma/client"
import { QuickAddItems } from "./QuickAddItems"

interface QuickAddSectionProps {
  data: UserFeature[]
  heading: string
}
export const QuickAddSection = ({ data, heading }: QuickAddSectionProps) => {
  console.log(data)
  return (
    <div>
      <h2 className="mb-1 text-lg font-medium opacity-90">{heading}</h2>
      <div className="w-fit rounded-sm border">
        {data.length ? (
          data.map((item, index) => (
            <QuickAddItems
              key={item.id}
              data={item}
              lastIndex={data.length - 1 !== index}
            />
          ))
        ) : (
          <div className="px-4 py-2 text-sm text-gray-300">No items</div>
        )}
      </div>
    </div>
  )
}
