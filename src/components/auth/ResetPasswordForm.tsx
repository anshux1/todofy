"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useAction } from "@/hooks/useAction"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { PasswordField } from "@/components/FormFields"
import { resetPassword } from "@/actions/auth"
import { resetPasswordSchema } from "@/actions/auth/schema"
import { InputTypeResetPassword } from "@/actions/auth/types"

export const ResetPasswordForm = () => {
  const form = useForm<InputTypeResetPassword>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })
  const { isLoading, execute } = useAction(resetPassword, {})
  const onSubmit = async (values: InputTypeResetPassword) => {
    execute(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <PasswordField
          control={form.control}
          name="password"
          label="Password"
          placeholder="Enter new password"
        />
        <PasswordField
          control={form.control}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Enter new password again"
        />
        <Button size="lg" type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Please wait" : "Reset password"}
        </Button>
      </form>
    </Form>
  )
}
