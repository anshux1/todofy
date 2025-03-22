import { ReactNode, useState } from "react"
import { SelectDateOptions } from "@/constants/features"
import { Timer } from "lucide-react"

import { cn, generateTimeSlots } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
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
import { Separator } from "@/components/ui/separator"

export const SelectDate = ({ children }: { children: ReactNode }) => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const times = generateTimeSlots()
  console.log(times)
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align="start" className="max-w-56 p-0">
        <input
          className="h-auto w-full rounded-sm px-2.5 py-2 text-sm focus:outline-none"
          placeholder="Type a date.."
        />
        <Separator />
        <div className="p-1">
          {SelectDateOptions.map((item) => {
            return (
              <div
                key={item.name}
                className="text-secondary-foreground hover:bg-secondary flex cursor-pointer items-center space-x-3 rounded-sm px-2.5 py-1.5 text-sm font-light"
              >
                <item.Icon className={cn("size-5", item.className)} />
                <span>{item.name}</span>
              </div>
            )
          })}
        </div>
        <div className="border-t px-2.5 py-3">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="p-0.5"
          />
        </div>
        <Separator />
        <div className="p-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="w-full">
                <Timer size={16} aria-hidden="true" className="mr-1" />
                <span>Time</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="center" className="p-0">
              <div className="flex items-center justify-between gap-14 p-1.5 pl-4">
                <p>Time</p>
                <Select
                  defaultValue="00:00"
                  onValueChange={(value) => console.log(value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <ScrollArea className="h-80">
                      {times.map((time) => {
                        return (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        )
                      })}
                      <ScrollBar className="hidden" />
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between gap-14 p-1.5 pl-4">
                <p>Duration</p>
                <Input placeholder="In Minutes" />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </PopoverContent>
    </Popover>
  )
}
