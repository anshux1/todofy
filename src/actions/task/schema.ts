import { z } from "zod"

export const taskAddSchema = z.object({
  assigned_to_uid: z.string().optional(),
  title: z.string().min(1, { message: "Title is required" }),
  checked: z.boolean().optional(),
  content: z.string().optional(),
  deadline: z.date().optional(),
  duration: z.number().optional(),
  is_deleted: z.boolean().optional(),
  labels: z.array(z.string()).optional(),
  priority: z.number().optional(),
  project_id: z.string().optional(),
})
