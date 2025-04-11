import { z } from "zod"

import { ActionState } from "@/lib/create-action"
import {
  createLabelSchema,
  deleteLabelSchema,
  toggleFavoriteSchema,
  updateLabelSchema,
} from "./schema"

export type InputTypeCreateLabel = z.infer<typeof createLabelSchema>
export type ReturnTypeCreateLabel = ActionState<InputTypeCreateLabel, string>

export type InputTypeUpdateLabel = z.infer<typeof updateLabelSchema>
export type ReturnTypeUpdateLabel = ActionState<InputTypeCreateLabel, string>

export type InputTypeDeleteLabel = z.infer<typeof deleteLabelSchema>
export type ReturnTypeDeleteLabel = ActionState<InputTypeDeleteLabel, string>

export type InputTypeToggleFavorite = z.infer<typeof toggleFavoriteSchema>
export type ReturnTypeToggleFavorite = ActionState<
  InputTypeToggleFavorite,
  string
>
