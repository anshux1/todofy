import { ReactNode } from "react"
import { PriorityOptions } from "@/constants/features"

import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export const SelectPriority = ({ children }: { children: ReactNode }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align="start" className="w-fit p-1">
        {PriorityOptions.map((item) => {
          return (
            <div
              key={item.name}
              className="text-secondary-foreground hover:bg-secondary flex cursor-pointer items-center gap-3 rounded-sm px-2.5 py-1.5 text-sm font-light"
            >
              <item.Icon className={cn("size-5", item.className)} />
              <span>{item.name}</span>
            </div>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
