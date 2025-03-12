"use client"

import { useState } from "react"
import { Popover } from "@radix-ui/react-popover"
import {
  Armchair,
  CalendarArrowUp,
  CalendarHeart,
  Calendar as CalendarIcon,
  Plus,
  Sun,
} from "lucide-react"

import { AutoResizeTextarea } from "@/components/ui/auto-resize-textarea"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

export function AddTask() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="xs"
          className="w-full justify-start px-1.5"
          variant="ghost"
        >
          <Plus className="size-5" />
          <p>Add task</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="top-[30%] left-[50%] p-0 sm:max-w-3xl lg:left-[56%]">
        <DialogHeader className="hidden">
          <DialogTitle />
        </DialogHeader>
        <div className="px-4 pt-4">
          <AutoResizeTextarea
            id="name"
            className="bg-background h-auto w-full pr-4 text-lg font-semibold focus:outline-none"
            placeholder="Finish Slides by Monday 10am p1"
          />
          <AutoResizeTextarea
            id="name"
            className="bg-background h-auto w-full pr-4 text-xs focus:outline-none"
            placeholder="Descrpition"
          />
          <div className="flex gap-1">
            <SelectDate />
            <SelectPriority />
          </div>
        </div>
        <Separator />
        <DialogFooter className="flex-row justify-end px-4 pb-4">
          <DialogClose asChild>
            <Button size="xs" type="submit" variant="ghost">
              Cancel
            </Button>
          </DialogClose>
          <Button size="xs" type="submit">
            Add task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const SelectPriority = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex items-center" variant="outline" size="xxs">
          <CalendarIcon className="-my-0.5 size-3.5" />
          Priority
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="max-w-28 p-0">
        <div className="text-muted-foreground hover:bg-secondary flex items-center gap-2 px-2.5 py-1.5 text-sm">
          <CalendarHeart className="size-5 stroke-red-600" />
          Priority 1
        </div>
        <div className="text-muted-foreground hover:bg-secondary flex items-center gap-2 px-2.5 py-1.5 text-sm">
          {" "}
          <Sun className="size-5 stroke-orange-400" />
          Priority 2
        </div>
        <div className="text-muted-foreground hover:bg-secondary flex items-center gap-2 px-2.5 py-1.5 text-sm">
          {" "}
          <CalendarArrowUp className="size-5 stroke-purple-600" /> Priority 3
        </div>
        <div className="text-muted-foreground hover:bg-secondary flex items-center gap-2 px-2.5 py-1.5 text-sm">
          {" "}
          <Armchair className="size-5 stroke-blue-600" /> Priority 4
        </div>
      </PopoverContent>
    </Popover>
  )
}

const SelectDate = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex items-center" variant="outline" size="xxs">
          <CalendarIcon className="size-3.5" />
          <span>Date</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="max-w-56 p-0">
        <input
          className="bg-background h-auto w-full px-2.5 py-1.5 text-sm focus:outline-none"
          placeholder="Type a date.."
        />
        <Separator />
        <div className="text-muted-foreground flex items-center gap-2 px-2.5 pt-2 pb-1 text-sm">
          <CalendarHeart className="size-5 stroke-red-600" />
          Today
        </div>
        <div className="text-muted-foreground flex items-center gap-2 px-2.5 py-1 text-sm">
          {" "}
          <Sun className="size-5 stroke-orange-400" /> Tommorow
        </div>
        <div className="text-muted-foreground flex items-center gap-2 px-2.5 py-1 text-sm">
          {" "}
          <CalendarArrowUp className="size-5 stroke-purple-600" /> Next Week
        </div>
        <div className="text-muted-foreground flex items-center gap-2 px-2.5 pt-1 pb-2 text-sm">
          {" "}
          <Armchair className="size-5 stroke-blue-600" /> Next Weekend
        </div>
        <div className="border-t px-2.5 py-3">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="p-0.5"
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
