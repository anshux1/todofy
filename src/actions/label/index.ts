"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"

import { auth } from "@/lib/auth"
import { createAction } from "@/lib/create-action"
import prisma from "@/db"
import {
  createLabelSchema,
  deleteLabelSchema,
  toggleFavoriteSchema,
  updateLabelSchema,
} from "./schema"
import {
  InputTypeCreateLabel,
  InputTypeDeleteLabel,
  InputTypeToggleFavorite,
  InputTypeUpdateLabel,
  ReturnTypeCreateLabel,
  ReturnTypeDeleteLabel,
  ReturnTypeToggleFavorite,
  ReturnTypeUpdateLabel,
} from "./types"

const createLabelHandler = async (
  input: InputTypeCreateLabel,
): Promise<ReturnTypeCreateLabel> => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    const userId = session?.user?.id
    if (!userId) {
      return { error: "Unauthrized" }
    }

    if (!input.item_order) {
      const lastLabel = await prisma.label.findFirst({
        where: { userId },
        orderBy: { item_order: "desc" },
      })
      const nextOrder = (lastLabel?.item_order || 0) + 1
      input.item_order = nextOrder
    }

    await prisma.label.create({
      data: {
        name: input.name,
        isFavorite: input.isFavorite,
        color: input.color,
        userId,
        item_order: input.item_order,
      },
    })
    if (input.currentPath) revalidatePath(input.currentPath)
    return { data: "Label created successfully" }
  } catch {
    return { error: "Failed to create label" }
  }
}

const updateLabelHandler = async (
  input: InputTypeUpdateLabel,
): Promise<ReturnTypeUpdateLabel> => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    const userId = session?.user?.id
    if (!userId) {
      return { error: "Unauthrized" }
    }

    await prisma.label.update({
      where: { id: input.id },
      data: {
        name: input.name,
        color: input.color,
        isFavorite: input.isFavorite,
      },
    })

    if (input.currentPath) revalidatePath(input.currentPath)
    return { data: "Label edited successfully" }
  } catch {
    return { error: "Failed to update label" }
  }
}

const deleteLabelHandler = async (
  input: InputTypeDeleteLabel,
): Promise<ReturnTypeDeleteLabel> => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    const userId = session?.user?.id
    if (!userId) {
      return { error: "Unauthrized" }
    }

    await prisma.label.delete({
      where: { id: input.id },
    })

    if (input.currentPath) revalidatePath(input.currentPath)
    return { data: "Label deleted successfully" }
  } catch {
    return { error: "Failed to update label" }
  }
}

const toggleFavoriteHandler = async (
  input: InputTypeToggleFavorite,
): Promise<ReturnTypeToggleFavorite> => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    const userId = session?.user?.id
    if (!userId) {
      return { error: "Unauthrized" }
    }

    const res = await prisma.label.update({
      where: {
        id: input.id,
      },
      data: {
        isFavorite: {
          set: !input.isFavorite,
        },
      },
    })
    revalidatePath(input.currentPath)
    return {
      data: res.isFavorite ? "Added to favorite" : "Removed from favorite",
    }
  } catch (err) {
    console.log("Error: ", err)
    return { error: "Failed to update" }
  }
}

export const createLabel = createAction(createLabelSchema, createLabelHandler)
export const updateLabel = createAction(updateLabelSchema, updateLabelHandler)
export const deleteLabel = createAction(deleteLabelSchema, deleteLabelHandler)

export const toggleFavorite = createAction(
  toggleFavoriteSchema,
  toggleFavoriteHandler,
)
