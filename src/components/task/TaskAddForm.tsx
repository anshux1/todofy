import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Goal } from "lucide-react"
import { useForm } from "react-hook-form"

import { UserFeature } from "@prisma/client"
import { cn } from "@/lib/utils"
import { AutoResizeTextarea } from "@/components/ui/auto-resize-textarea"
import { Button } from "@/components/ui/button"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { addTaskSchema } from "@/actions/task/schema"
import { InputTypeAddTask } from "@/actions/task/types"
import { getUserFeatures } from "@/db/data/account"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { SelectDate } from "./select/SelectDate"
import { SelectPriority } from "./select/SelectPriority"

export function TaskAddForm() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [duration, setDuration] = useState<Date | undefined>(undefined)
  const [priority, setPriority] = useState<number>(0)
  const [features, setFeatures] = useState<UserFeature[]>([])

  const form = useForm<InputTypeAddTask>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      date: undefined,
      deadline: undefined,
      duration: undefined,
      assigned_to_uid: undefined,
      labels: [],
      priority: 0,
      project_id: undefined,
    },
  })
  useEffect(() => {
    const fetchFeatures = async () => {
      const quickAddFeatures = await getUserFeatures("TASK")
      setFeatures(quickAddFeatures)
    }
    fetchFeatures()
  }, [])

  useEffect(() => {
    form.setValue("date", date)
    form.setValue("duration", duration)
    form.setValue("priority", priority)
  }, [date, priority, duration, form])

  const onSubmit = async (data: InputTypeAddTask) => {
    console.log("Submitted data:", data)
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (e) => console.log(e))}
          className="px-4 pt-4"
        >
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
            name="description"
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
            {features.find((item) => item.name === "Deadline") && (
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                              "capitalize",
                              field.value && "bg-secondary",
                            )}
                          >
                            <Goal
                              size={14}
                              aria-hidden="true"
                              className="mr-1"
                            />
                            {field.value
                              ? field.value.toLocaleDateString("en-US", {
                                  day: "numeric",
                                  month: "short",
                                })
                              : "Deadline"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            )}
          </div>
        </form>
        <Separator />
        <DialogFooter className="flex-row justify-end p-3">
          <DialogClose asChild>
            <Button size="xs" type="reset" variant="ghost">
              Cancel
            </Button>
          </DialogClose>
          <Button
            size="xs"
            type="button"
            onClick={form.handleSubmit(onSubmit, (e) => console.log(e))}
          >
            Add task
          </Button>
        </DialogFooter>
      </Form>
    </div>
  )
}
