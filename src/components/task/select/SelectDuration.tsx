import { set } from "date-fns"
import { Timer } from "lucide-react"
import { Control, FieldValues, Path } from "react-hook-form"

import { generateTimeSlots } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function SelectDuration<F extends FieldValues>(props: {
  control: Control<F>
  name: Path<F>
  children?: React.ReactNode
  date: Date | undefined
}) {
  return !props.date ? (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <Timer size={16} aria-hidden="true" className="mr-1" />
          <span>Time</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Select Date First</p>
      </TooltipContent>
    </Tooltip>
  ) : (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <Timer size={16} aria-hidden="true" className="mr-1" />
          <span>Select Time</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="center" className="p-0">
        <div className="flex items-center justify-between gap-14 p-1.5 pl-4">
          <p>Time</p>
          <Select
            defaultValue={set(props.date, {
              hours: 0,
              minutes: 0,
              seconds: 0,
              milliseconds: 0,
            }).toISOString()}
            //           onValueChange={(value) => setDate(new Date(value))}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-80">
                {generateTimeSlots(props.date).map((time) => {
                  console.log("Time: ", time)
                  return (
                    <SelectItem
                      key={time.label}
                      value={time.value.toISOString()}
                    >
                      {time.label}
                    </SelectItem>
                  )
                })}
                <ScrollBar className="hidden" />
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-3 p-1.5 pl-4">
          <div className="flex items-center justify-between gap-14">
            <p>Duration</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
