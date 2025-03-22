"use client"

import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TaskAddForm } from "./TaskAddForm"

export function TaskAddDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="xs"
          className="text-primary w-full justify-start px-1.5"
          variant="ghost"
        >
          <Plus className="size-5" />
          <span>Add task</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="top-[30%] left-[50%] p-0 sm:max-w-3xl lg:left-[56%]">
        <DialogHeader className="hidden">
          <DialogTitle />
        </DialogHeader>
        <TaskAddForm />
      </DialogContent>
    </Dialog>
  )
}
