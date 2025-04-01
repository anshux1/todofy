import { headers } from "next/headers"

import { auth } from "@/lib/auth"
import { createAction } from "@/lib/create-action"
import prisma from "@/db"
import { addTaskSchema } from "./schema"
import { InputTypeAddTask, ReturnTypeAddTask } from "./types"

const addTaskHandler = async (
  input: InputTypeAddTask,
): Promise<ReturnTypeAddTask> => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    const userId = session?.user.id
    if (!userId) {
      return { error: "Unauthroized" }
    }
    const newTask = await prisma.task.create({
      data: {
        title: input.title,
        description: input.description,
        priority: input.priority,
        date: input.date,
        deadline: input.deadline,
        duration: input.duration,
        added_by_uid: userId,
        is_deleted: false,
        checked: false,
        labels: input.labels,
        assigned_to_uid: input.assigned_to_uid,
        project_id: input.project_id,
      },
    })
    return { data: newTask }
  } catch {
    return { error: "Failed to toggle feature" }
  }
}

export const addTask = createAction(addTaskSchema, addTaskHandler)
