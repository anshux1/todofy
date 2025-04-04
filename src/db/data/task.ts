"use server"

import { headers } from "next/headers"
import { endOfDay, startOfDay } from "date-fns"

import { auth } from "@/lib/auth"
import prisma from "@/db"

export const getTodayTask = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const userId = session?.user.id
  const today = {
    start: startOfDay(new Date()),
    end: endOfDay(new Date()),
  }
  console.log(userId)
  return await prisma.task.findMany({
    where: {
      OR: [{ added_by_uid: userId }, { assigned_to_uid: userId }],
      date: {
        gte: today.start,
        lt: today.end,
      },
      checked: false,
    },
  })
}
