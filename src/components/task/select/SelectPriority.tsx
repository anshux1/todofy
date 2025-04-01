import { PriorityOptions } from "@/constants/features"
import { Flag } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface SelectPriorityProps {
  priority: number
  setPriority: React.Dispatch<React.SetStateAction<number>>
}

export const SelectPriority = ({
  priority,
  setPriority,
}: SelectPriorityProps) => {
  return (
    <Popover>
      <PopoverTrigger className={cn("")} asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn("capitalize", priority > 0 && "bg-secondary")}
        >
          <Flag size={14} aria-hidden="true" className="mr-1" />
          {priority > 0 ? `P${priority}` : "Priority"}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-fit p-1">
        {PriorityOptions.map((item) => {
          return (
            <div
              key={item.name}
              className={cn(
                "text-secondary-foreground hover:bg-secondary flex cursor-pointer items-center gap-3 rounded-sm px-2.5 py-1.5 text-sm font-light",
                priority === item.value && "bg-secondary",
              )}
              onClick={() => setPriority(item.value)}
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
