"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useAction } from "@/hooks/useAction"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { InputField } from "@/components/FormFields"
import { forgotPassword } from "@/actions/auth"
import { forgotPasswordSchema } from "@/actions/auth/schema"
import { InputTypeForgotPassword } from "@/actions/auth/types"

export const ForgotPasswordForm = () => {
  const form = useForm<InputTypeForgotPassword>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })
  const { isLoading, execute } = useAction(forgotPassword, {})
  const onSubmit = async (values: InputTypeForgotPassword) => {
    execute(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          className="bg-transparent dark:bg-transparent"
          control={form.control}
          name="email"
          label="Email"
          placeholder="example@gmail.com"
        />
        <Button size="lg" type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Please wait" : "Sign In"}
        </Button>
      </form>
    </Form>
  )
}
