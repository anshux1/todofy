"use server"

import { headers } from "next/headers"

import { FeatureType } from "@prisma/client"
import { auth } from "@/lib/auth"
import prisma from "@/db"

export const getAccountDetails = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return await prisma.account.findFirst({
    where: { userId: session?.user.id, providerId: "credential" },
    select: {
      password: true,
    },
  })
}

export const getUserFeatures = async (type?: FeatureType) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return await prisma.userFeature.findMany({
    where: { userId: session?.user.id, type },
  })
}
