"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { authClient } from "@/lib/auth.config"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { updateNameSchema } from "@/actions/schema"
import { InputTypeUpdateName } from "@/actions/types"
import { InputField } from "../FormFields"

export const AccountNameForm = () => {
  const userName = authClient.useSession().data?.user.name
  const form = useForm<InputTypeUpdateName>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: {
      name: userName || "",
    },
  })

  const onSubmit = async (value: InputTypeUpdateName) => {
    await authClient.updateUser(
      {
        name: value.name,
      },
      {
        onSuccess: () => {
          toast("Name Updated!", {
            position: "bottom-right",
            className: "bg-primary",
          })
        },
      },
    )
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-3 flex items-end gap-2 px-3.5"
      >
        <InputField
          control={form.control}
          name="name"
          label="Name"
          placeholder="Enter your name"
        />
        {form.getValues("name") !== userName && (
          <Button type="submit" size="lg" variant="secondary">
            Update
          </Button>
        )}
      </form>
    </Form>
  )
}
