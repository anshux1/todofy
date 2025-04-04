import z from "zod"

const passwordSchema = z.string().min(6, "Must be atleast 6 characters")

export const signinSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: passwordSchema,
})

export const signupSchema = signinSchema.extend({
  name: z.string().min(1, { message: "Name is required" }),
})

export const AccessTokenSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  url: z.string().url({ message: "URL is required" }),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email!" }),
})

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((item) => item.password === item.confirmPassword)

export const setPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const changePasswordSchema = z
  .object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
    revokeSessions: z.boolean().optional(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
