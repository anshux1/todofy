import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarMinus, Flag, Goal } from "lucide-react"
import { useForm, UseFormSetValue } from "react-hook-form"
import { toast } from "sonner"

import { UserFeature } from "@prisma/client"
import { cn } from "@/lib/utils"
import { useAction } from "@/hooks/useAction"
import { Button } from "@/components/ui/button"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { addTask } from "@/actions/task"
import { addTaskSchema } from "@/actions/task/schema"
import { InputTypeAddTask } from "@/actions/task/types"
import { getUserFeatures } from "@/db/data/account"
import { AutoResizeTextareaField, DateField } from "../FormFields"
import { SelectColor } from "./select/SelectColor"
import { SelectDate } from "./select/SelectDate"
import { SelectDuration } from "./select/SelectDuration"
import { SelectPriority } from "./select/SelectPriority"

export type FormSetValueType = UseFormSetValue<InputTypeAddTask>

export function TaskAddForm() {
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
      priority: 1,
      project_id: undefined,
      color: "sky",
    },
  })
  useEffect(() => {
    const fetchFeatures = async () => {
      const quickAddFeatures = await getUserFeatures("TASK")
      setFeatures(quickAddFeatures)
    }
    fetchFeatures()
  }, [])

  const {} = useAction(addTask, {
    onSuccess: (data) => {
      toast.success(data)
    },
  })

  const onSubmit = async (value: InputTypeAddTask) => {
    console.log("Submitted value", value)
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (e) => console.log(e))}
          className="px-4 pt-4"
        >
          <AutoResizeTextareaField
            control={form.control}
            name="title"
            placeholder="Finish Slides by Monday 10am p1"
            className="text-lg font-semibold"
          />
          <AutoResizeTextareaField
            control={form.control}
            name="description"
            placeholder="Descrpition"
            className="text-xs"
          />
          <div className="my-2 flex flex-wrap gap-2">
            {features.find((item) => item.name === "Date") && (
              <SelectDate
                setValue={form.setValue}
                control={form.control}
                name="date"
                popoverTrigger={() => {
                  const date = form.watch("date")
                  return (
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn("capitalize", date && "bg-secondary")}
                    >
                      <CalendarMinus
                        size={14}
                        aria-hidden="true"
                        className="mr-1"
                      />
                      {date
                        ? date.toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                          })
                        : "Date"}
                    </Button>
                  )
                }}
              >
                <SelectDuration
                  control={form.control}
                  name="duration"
                  date={form.getValues("date")}
                />
              </SelectDate>
            )}
            {features.find((item) => item.name === "Priority") && (
              <SelectPriority
                control={form.control}
                name="priority"
                popoverTrigger={() => {
                  const priority = form.watch("priority")
                  return (
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "capitalize",
                        priority > 0 && "bg-secondary",
                      )}
                    >
                      <Flag size={14} aria-hidden="true" className="mr-1" />
                      {priority > 0 ? `P${priority}` : "Priority"}
                    </Button>
                  )
                }}
              />
            )}
            {features.find((item) => item.name === "Deadline") && (
              <DateField
                control={form.control}
                name="deadline"
                popoverTrigger={() => {
                  const deadline = form.watch("deadline")
                  return (
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn("capitalize", deadline && "bg-secondary")}
                    >
                      <Goal size={14} aria-hidden="true" className="mr-1" />
                      {deadline
                        ? deadline.toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                          })
                        : "Deadline"}
                    </Button>
                  )
                }}
              />
            )}
            <SelectColor
              control={form.control}
              name="color"
              setValue={form.setValue}
              popoverTrigger={() => {
                const color = form.watch("color")
                return (
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn("capitalize", "bg-secondary")}
                  >
                    <div
                      className={`bg-${color}-400 size-4 rounded-full`}
                    ></div>
                    {color}
                  </Button>
                )
              }}
            />
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
