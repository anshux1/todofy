import { z } from "zod"

export const addTaskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  date: z.date().optional(),
  deadline: z.date().optional(),
  duration: z.date().optional(),
  assigned_to_uid: z.string().optional(),
  labels: z.array(z.string()).optional(),
  priority: z.number().optional(),
  project_id: z.string().optional(),
})
