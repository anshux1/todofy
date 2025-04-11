"use client"

import { ReactNode, useState } from "react"
import { usePathname } from "next/navigation"
import { allowedColors } from "@/constants/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { label } from "@prisma/client"
import { cn } from "@/lib/utils"
import { useAction } from "@/hooks/useAction"
import { Button } from "@/components/ui/button"
import {
  DialogDrawer,
  DialogDrawerClose,
  DialogDrawerContent,
  DialogDrawerDescription,
  DialogDrawerHeader,
  DialogDrawerTitle,
  DialogDrawerTrigger,
} from "@/components/ui/dialog-drawer"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { InputField, SwitchField } from "@/components/FormFields"
import {
  createLabel as createLabelHandler,
  updateLabel as updateLabelHandler,
} from "@/actions/label"
import { createLabelSchema } from "@/actions/label/schema"
import {
  InputTypeCreateLabel,
  InputTypeUpdateLabel,
} from "@/actions/label/types"

export const LabelCreateUpdateForm = (props: {
  item_order?: number
  children: ReactNode
  label?: label
  type: "create" | "update"
}) => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm<InputTypeCreateLabel>({
    resolver: zodResolver(createLabelSchema),
    defaultValues: {
      name: props.label?.name || "",
      color: props.label?.color || "neutral",
      isFavorite: props.label?.isFavorite || false,
      item_order: props.item_order,
      currentPath: pathname,
    },
  })

  const { execute: createLabel, isLoading: isCreateing } = useAction(
    createLabelHandler,
    {
      onSuccess: () => toast("Label created successfully"),
      onError: (error) => toast.error(error),
      onComplete: () => {
        form.reset()
        setIsOpen(false)
      },
    },
  )

  const { execute: updateLabel, isLoading: isUpdating } = useAction(
    updateLabelHandler,
    {
      onSuccess: () => toast("Label updated successfully"),
      onError: (error) => toast.error(error),
      onComplete: () => setIsOpen(false),
    },
  )

  const onSubmit = async (
    values: InputTypeCreateLabel | InputTypeUpdateLabel,
  ) => {
    if (props.type === "update") {
      if (!props.label?.id) {
        toast.error("Cannot update label")
        return
      }
      updateLabel({
        ...values,
        id: props.label.id,
      })
    } else {
      createLabel(values)
    }
  }

  return (
    <DialogDrawer
      open={isOpen}
      onOpenChange={(e) => {
        setIsOpen(e)
        form.reset()
      }}
    >
      <DialogDrawerTrigger asChild>{props.children}</DialogDrawerTrigger>
      <DialogDrawerContent className="w-full items-center sm:max-w-md">
        <DialogDrawerHeader className="w-full max-w-sm p-6 sm:max-w-md sm:p-0">
          <DialogDrawerTitle>
            {props.type === "create" ? "Create new label" : "Edit Label"}
          </DialogDrawerTitle>
          <DialogDrawerDescription>
            Organize your tasks by{" "}
            {props.type === "create" ? "creating" : "editing"} labels.
          </DialogDrawerDescription>
        </DialogDrawerHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full max-w-sm flex-col space-y-2 px-6 pb-6 sm:max-w-md sm:p-0"
          >
            <InputField
              control={form.control}
              name="name"
              label="Name"
              type="text"
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Color</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        iconVisible={false}
                        className="justify-start capitalize"
                      >
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <ScrollArea className="h-52">
                        {Object.keys(allowedColors).map((item) => (
                          <SelectItem
                            key={item}
                            className="flex capitalize"
                            value={item}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={cn(
                                  "size-3 rounded-full",
                                  allowedColors[
                                    item as keyof typeof allowedColors
                                  ].bg,
                                )}
                              ></div>
                              <p>{item}</p>
                            </div>
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <SwitchField
              required={false}
              control={form.control}
              name="isFavorite"
              label="Add to Favorite"
            />

            <div className="space-x-2 self-end">
              <DialogDrawerClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogDrawerClose>
              <Button disabled={isCreateing || isUpdating} type="submit">
                {props.type === "create" ? "Create" : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogDrawerContent>
    </DialogDrawer>
  )
}
