import z from "zod"

import { updateNameSchema } from "./schema"

export type InputTypeUpdateName = z.infer<typeof updateNameSchema>
