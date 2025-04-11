"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { useAction } from "@/hooks/useAction"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { updateName } from "@/actions/user"
import { updateNameSchema } from "@/actions/user/schema"
import { InputTypeUpdateName } from "@/actions/user/types"
import { InputField } from "../FormFields"

export const AccountNameForm = (props: { name: string }) => {
  const pathname = usePathname()
  const form = useForm<InputTypeUpdateName>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: {
      name: props.name || "",
      currentPath: pathname,
    },
  })

  const { execute, isLoading } = useAction(updateName, {
    onSuccess: () => {
      toast("Name Updated!", {
        position: "bottom-right",
        className: "bg-primary",
      })
    },
  })

  const onSubmit = (value: InputTypeUpdateName) => execute(value)
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-3 flex items-end gap-2"
      >
        <InputField
          control={form.control}
          name="name"
          label="Name"
          placeholder="Enter your name"
        />
        {form.getValues("name") !== props.name && (
          <Button
            disabled={isLoading}
            type="submit"
            size="lg"
            variant="secondary"
          >
            Update
          </Button>
        )}
      </form>
    </Form>
  )
}
