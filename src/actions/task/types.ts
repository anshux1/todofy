import { z } from "zod"

import { Task } from "@prisma/client"
import { ActionState } from "@/lib/create-action"
import { addTaskSchema } from "./schema"

export type InputTypeAddTask = z.infer<typeof addTaskSchema>
export type ReturnTypeAddTask = ActionState<InputTypeAddTask, Task>
