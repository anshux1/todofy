import React from "react"

import { getTodayTask } from "@/db/data/task"

export default async function page() {
  const task = await getTodayTask()
  console.log("Today task : ", task)
  return <div>page</div>
}
