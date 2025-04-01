import { z } from "zod"

import { Task } from "@prisma/client"
import { ActionState } from "@/lib/create-action"
import { taskAddSchema } from "./schema"

export type InputTypeAddTask = z.infer<typeof taskAddSchema>
export type ReturnTypeAddTask = ActionState<InputTypeAddTask, Task>
