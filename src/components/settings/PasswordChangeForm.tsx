"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { authClient } from "@/lib/auth.config"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { CheckboxField, InputField } from "@/components/FormFields"
import { changePasswordSchema } from "@/actions/auth/schema"
import { InputTypeChangePassword } from "@/actions/auth/types"

export const PasswordChangeForm = () => {
  const form = useForm<InputTypeChangePassword>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      revokeSessions: false,
    },
  })

  const onSubmit = async (data: InputTypeChangePassword) => {
    try {
      const result = await authClient.changePassword({
        newPassword: data.newPassword,
        currentPassword: data.oldPassword,
        revokeOtherSessions: data.revokeSessions,
      })
      if (result.data) toast.success("Password updated successfully")
    } finally {
      form.reset()
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3 space-y-5">
        <InputField
          className="w-11/12 sm:w-3/5"
          control={form.control}
          type="password"
          name="oldPassword"
          label="Old Password"
          placeholder="Old password"
        />
        <InputField
          className="w-11/12 sm:w-3/5"
          control={form.control}
          type="password"
          name="newPassword"
          label="New Password"
          placeholder="Enter your new password"
        />
        <InputField
          className="w-11/12 sm:w-3/5"
          control={form.control}
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Enter password again"
        />
        <CheckboxField
          control={form.control}
          name="revokeSessions"
          label="Revoke other sessions"
        />
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => form.reset()} type="reset">
            Cancle
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  )
}
