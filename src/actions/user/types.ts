import z from "zod"

import { UserFeature } from "@prisma/client"
import { ActionState } from "@/lib/create-action"
import {
  deleteImageSchema,
  toggleFeatureSchema,
  updateNameSchema,
} from "./schema"

export type InputTypeToggleFeature = z.infer<typeof toggleFeatureSchema>
export type ReturnTypeToggleFeature = ActionState<
  InputTypeToggleFeature,
  UserFeature
>

export type InputTypeUpdateName = z.infer<typeof updateNameSchema>
export type ReturnTypeUpdateName = ActionState<InputTypeUpdateName, boolean>

export type InputTypeDeleteImage = z.infer<typeof deleteImageSchema>
export type ReturnTypeDeleteImage = ActionState<InputTypeDeleteImage, boolean>
