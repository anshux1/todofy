import z from "zod"

import { UserFeature } from "@prisma/client"
import { ActionState } from "@/lib/create-action"
import { toggleFeatureSchema } from "./schema"

export type InputTypeToggleFeature = z.infer<typeof toggleFeatureSchema>
export type ReturnTypeToggleFeature = ActionState<
  InputTypeToggleFeature,
  UserFeature
>
