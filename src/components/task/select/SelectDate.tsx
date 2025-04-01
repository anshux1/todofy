"use client"

import { Dispatch, useState } from "react"
import { SelectDateOptions } from "@/constants/features"
import { format, getYear, set } from "date-fns"
import { CalendarMinus, Timer } from "lucide-react"

import { cn, generateTimeSlots } from "@/lib/utils"
import { useDateParse } from "@/hooks/useDateParse"
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface SelectDateProps {
  date: Date | undefined
  setDate: Dispatch<React.SetStateAction<Date | undefined>>
  duration?: Date | undefined
  setDuration: Dispatch<React.SetStateAction<Date | undefined>>
}

export const SelectDate = ({
  date,
  setDate,
  duration,
  setDuration,
}: SelectDateProps) => {
  const [inputValue, setInputValue] = useState("")

  const parsedDate = useDateParse(inputValue)
  setDate(parsedDate)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn("capitalize", date && "bg-secondary")}
        >
          <CalendarMinus size={14} aria-hidden="true" className="mr-1" />
          {date
            ? date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
              })
            : "Date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="max-w-56 p-0">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="h-auto w-full rounded-sm px-2.5 py-2 text-sm focus:outline-none"
          placeholder="Type a date.."
        />
        <Separator />
        <div className="p-1">
          {SelectDateOptions.map((item) => {
            return (
              <div
                key={item.name}
                className={cn(
                  "text-secondary-foreground hover:bg-secondary flex cursor-pointer items-center space-x-3 rounded-sm px-2.5 py-1.5 text-sm font-light",
                )}
                onClick={() => setDate(item.value)}
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
            month={date}
            selected={date}
            onSelect={setDate}
            fromYear={2025}
            toYear={getYear(new Date()) + 4}
            weekStartsOn={1}
            className="p-0.5"
          />
        </div>
        <Separator />
        <div className="p-1">
          {!date ? (
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
                    defaultValue={set(date, {
                      hours: 0,
                      minutes: 0,
                      seconds: 0,
                      milliseconds: 0,
                    }).toISOString()}
                    onValueChange={(value) => setDate(new Date(value))}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <ScrollArea className="h-80">
                        {generateTimeSlots(date).map((time) => {
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
                    <Input
                      onChange={(e) =>
                        setDuration(
                          set(date, {
                            hours: 0,
                            minutes: e.target.value
                              ? parseInt(e.target.value)
                              : 0,
                            seconds: 0,
                            milliseconds: 0,
                          }),
                        )
                      }
                      type="number"
                      placeholder="In Minutes"
                    />
                  </div>
                  {duration && (
                    <p className="text-muted-foreground">
                      {format(duration, "d MMMM yyyy 'at' HH:mm")}
                    </p>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
