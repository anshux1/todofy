import { headers } from "next/headers"

import { cn } from "@/lib/utils"

export default async function Page() {
  const header = (await headers()).get("referer")
  console.log(header)
  return (
    <div className={cn("flex flex-1 flex-col gap-4 overflow-hidden px-4 py-2")}>
      <div className="bg-muted/50 mx-auto h-full w-full max-w-3xl rounded-xl px-4" />
    </div>
  )
}
