import { z } from "zod"

export const createLabelSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be less than 50 characters" }),
  isFavorite: z.boolean(),
  color: z.string().min(1, { message: "Color is required" }),
  item_order: z.number().optional(),
  currentPath: z.string(),
})

export const updateLabelSchema = createLabelSchema
  .omit({ item_order: true })
  .extend({
    id: z.string(),
  })

export const deleteLabelSchema = z.object({
  id: z.string({ message: "Label Id is required" }),
  currentPath: z.string(),
})

export const toggleFavoriteSchema = z.object({
  id: z.string(),
  currentPath: z.string(),
  isFavorite: z.boolean(),
})
