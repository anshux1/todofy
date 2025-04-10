import { featuresData } from "@/constants/quick-add"

import prisma from "@/db"

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
