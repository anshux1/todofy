"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { featuresData } from "@/constants/quick-add"

import { auth } from "@/lib/auth"
import { createAction } from "@/lib/create-action"
import { containerClient } from "@/lib/services/azure"
import prisma from "@/db"
import {
  deleteImageSchema,
  toggleFeatureSchema,
  updateNameSchema,
} from "./schema"
import {
  InputTypeDeleteImage,
  InputTypeToggleFeature,
  InputTypeUpdateName,
  ReturnTypeDeleteImage,
  ReturnTypeToggleFeature,
  ReturnTypeUpdateName,
} from "./types"

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

const updateNameHandler = async (
  input: InputTypeUpdateName,
): Promise<ReturnTypeUpdateName> => {
  try {
    const response = await auth.api.updateUser({
      headers: await headers(),
      body: {
        name: input.name,
      },
    })
    if (input.currentPath) revalidatePath(input.currentPath)
    return { data: response.status }
  } catch (err) {
    console.log("Error :", err)
    return { error: "Failed to update name!" }
  }
}
const deleteImageHandler = async (
  input: InputTypeDeleteImage,
): Promise<ReturnTypeDeleteImage> => {
  try {
    const url = new URL(input.imageUrl)
    const blobName = decodeURIComponent(
      url.pathname.split("/").slice(2).join("/"),
    )
    const blobClient = containerClient.getBlockBlobClient(blobName)
    const res = await blobClient.deleteIfExists()
    if (res._response.status !== 202) {
      return { error: "Failed to delete image" }
    }
    return { data: res.succeeded }
  } catch {
    return { error: "Failed to delete image" }
  }
}
export const toggleFeature = createAction(
  toggleFeatureSchema,
  toggleFeatureHandler,
)
export const updateName = createAction(updateNameSchema, updateNameHandler)

export const deleteImage = createAction(deleteImageSchema, deleteImageHandler)
