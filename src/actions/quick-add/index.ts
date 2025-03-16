"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { featuresData } from "@/constants/features"

import { auth } from "@/lib/auth"
import { createAction } from "@/lib/create-action"
import prisma from "@/db"
import { toggleFeatureSchema } from "./schema"
import { InputTypeToggleFeature, ReturnTypeToggleFeature } from "./types"

const toggleFeatureHandler = async (
  input: InputTypeToggleFeature,
): Promise<ReturnTypeToggleFeature> => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    const userId = session?.user.id
    const userFeature = await prisma.userFeature.update({
      where: {
        id: input.featureId,
        userId,
      },
      data: {
        shown: input.shown,
      },
    })
    if (input.currentPath) revalidatePath(input.currentPath)
    return { data: userFeature }
  } catch {
    return { error: "Failed to toggle feature" }
  }
}

export const createUserFeatures = async (userId: string) => {
  for (const feat of featuresData) {
    await prisma.userFeature.create({
      data: {
        name: feat.name,
        shown: feat.shown,
        userId,
        type: feat.navigation ? "NAVIGATION" : "TASK",
      },
    })
  }
}

export const toggleFeature = createAction(
  toggleFeatureSchema,
  toggleFeatureHandler,
)
