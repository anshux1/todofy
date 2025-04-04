"use client"

import { JSX, useEffect, useState } from "react"
import { SelectDateOptions } from "@/constants/features"
import { getYear } from "date-fns"
import { Control, FieldValues, Path, UseFormSetValue } from "react-hook-form"

import { cn } from "@/lib/utils"
import { useDateParse } from "@/hooks/useDateParse"
import { Calendar } from "@/components/ui/calendar"
import { FormControl, FormField, FormItem } from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { InputTypeAddTask } from "@/actions/task/types"

export function SelectDate<F extends FieldValues>(props: {
  control: Control<F>
  name: Path<F>
  children?: React.ReactNode
  setValue: UseFormSetValue<InputTypeAddTask>
  popoverTrigger: () => JSX.Element
}) {
  const [inputValue, setInputValue] = useState<string>("")
  const date = useDateParse(inputValue)

  useEffect(() => {
    props.setValue("date", date)
  }, [date, props])

  return (
    <Popover>
      <PopoverTrigger asChild>{props.popoverTrigger()}</PopoverTrigger>
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
                onClick={() => props.setValue("date", item.value)}
              >
                <item.Icon className={cn("size-5", item.className)} />
                <span>{item.name}</span>
              </div>
            )
          })}
        </div>
        <div className="border-t px-2.5 py-3">
          <FormField
            control={props.control}
            name={props.name}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Calendar
                    mode="single"
                    month={date}
                    selected={field.value}
                    onSelect={field.onChange}
                    fromYear={2025}
                    toYear={getYear(new Date()) + 4}
                    className="p-0.5"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Separator />
        <div className="p-1">{props.children}</div>
      </PopoverContent>
    </Popover>
  )
}
