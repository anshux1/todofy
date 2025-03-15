"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { useAction } from "@/hooks/useAction"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { InputField } from "@/components/FormFields"
import { setPassword } from "@/actions/auth"
import { setPasswordSchema } from "@/actions/auth/schema"
import { InputTypeSetPassword } from "@/actions/auth/types"

export const PasswordAddForm = () => {
  const form = useForm<InputTypeSetPassword>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  })
  const { execute, isLoading } = useAction(setPassword, {
    onSuccess: () => {
      toast.success("Password set successfully")
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const onSubmit = async (data: InputTypeSetPassword) => execute(data)
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3 space-y-5">
        <InputField
          control={form.control}
          className="w-4/5 sm:w-3/5"
          name="newPassword"
          label="New Password"
          placeholder="Enter your new password"
          type="password"
        />
        <InputField
          className="w-4/5 sm:w-3/5"
          control={form.control}
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Enter password again"
        />
        <p className="text-muted-foreground">
          Your password must be at least 8 characters long. Avoid common words
          or patterns.
        </p>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => form.reset()}
            disabled={isLoading}
            type="reset"
          >
            Cancle
          </Button>
          <Button disabled={isLoading} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}
