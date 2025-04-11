import z from "zod"

export const toggleFeatureSchema = z.object({
  featureId: z.string(),
  shown: z.boolean(),
  currentPath: z.string().optional(),
})

export const updateNameSchema = z.object({
  name: z.string({ message: "Invalid name" }),
  currentPath: z.string().optional(),
})

export const deleteImageSchema = z.object({
  imageUrl: z.string().url(),
})
