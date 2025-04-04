import { ReactNode } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TaskAddForm } from "./TaskAddForm"

export function TaskAddDialog({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="top-[30%] left-[50%] p-0 sm:max-w-3xl lg:left-[56%]">
        <DialogHeader className="hidden">
          <DialogTitle />
        </DialogHeader>
        <TaskAddForm />
      </DialogContent>
    </Dialog>
  )
}
