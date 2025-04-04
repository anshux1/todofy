import { z } from "zod"

import { ActionState } from "@/lib/create-action"
import { addTaskSchema } from "./schema"

export type InputTypeAddTask = z.infer<typeof addTaskSchema>
export type ReturnTypeAddTask = ActionState<InputTypeAddTask, string>
