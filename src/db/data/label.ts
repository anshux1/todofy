"use server"

import { headers } from "next/headers"

import { label } from "@prisma/client"
import { auth } from "@/lib/auth"
import prisma from "@/db"

export const getLabels = async (isFavorite?: boolean): Promise<label[]> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session) return []

  return await prisma.label.findMany({
    where: { userId: session?.user.id, isFavorite },
    orderBy: { item_order: "asc" },
  })
}
