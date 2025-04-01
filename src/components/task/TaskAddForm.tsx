import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { UserFeature } from "@prisma/client"
import { AutoResizeTextarea } from "@/components/ui/auto-resize-textarea"
import { Button } from "@/components/ui/button"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { taskAddSchema } from "@/actions/task/schema"
import { InputTypeAddTask } from "@/actions/task/types"
import { getUserFeatures } from "@/db/data/account"
import { SelectDate } from "./select/SelectDate"
import { SelectPriority } from "./select/SelectPriority"

export function TaskAddForm() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [duration, setDuration] = useState<Date | undefined>(undefined)
  const [priority, setPriority] = useState<number>(0)
  const form = useForm<InputTypeAddTask>({
    resolver: zodResolver(taskAddSchema),
  })
  const [features, setFeatures] = useState<UserFeature[]>([])
  useEffect(() => {
    const fetchFeatures = async () => {
      const quickAddFeatures = await getUserFeatures("TASK")
      setFeatures(quickAddFeatures)
    }
    fetchFeatures()
  }, [])
  const onSubmit = async (data: InputTypeAddTask) => {
    console.log("data", data)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="px-4 pt-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AutoResizeTextarea
                    {...field}
                    className="bg-background h-auto w-full pr-4 text-lg font-semibold focus:outline-none"
                    placeholder="Finish Slides by Monday 10am p1"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <AutoResizeTextarea
                  {...field}
                  className="bg-background h-auto w-full pr-4 text-xs focus:outline-none"
                  placeholder="Descrpition"
                />
              </FormItem>
            )}
          />
          <div className="my-2 flex flex-wrap gap-2">
            {features.find((item) => item.name === "Date") && (
              <SelectDate
                duration={duration}
                setDuration={setDuration}
                date={date}
                setDate={setDate}
              />
            )}
            {features.find((item) => item.name === "Priority") && (
              <SelectPriority priority={priority} setPriority={setPriority} />
            )}
          </div>
        </form>
        <Separator />
        <DialogFooter className="flex-row justify-end p-3">
          <DialogClose asChild>
            <Button size="xs" type="button" variant="ghost">
              Cancel
            </Button>
          </DialogClose>
          <Button size="xs" type="submit">
            Add task
          </Button>
        </DialogFooter>
      </Form>
    </div>
  )
}
