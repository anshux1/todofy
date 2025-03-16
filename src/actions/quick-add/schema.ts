import z from "zod"

export const toggleFeatureSchema = z.object({
  featureId: z.string(),
  shown: z.boolean(),
  currentPath: z.string().optional(),
})
