import React from "react"
import Link from "next/link"
import { allowedColors } from "@/constants/label"
import { Tag } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LabelCreateUpdateForm } from "@/components/label/LabelCreateUpdateForm"
import { LabelOptions } from "@/components/label/LabelOptions"
import { getLabels } from "@/db/data/label"

export default async function page() {
  const labels = await getLabels()
  return (
    <div>
      <h1 className="text-4xl font-semibold">Labels</h1>
      {labels.map((item) => {
        return (
          <div
            key={item.id}
            className="group relative flex items-center gap-2 border-b px-3 py-2 lg:w-3/4"
          >
            <Link href={`/app/labels/${item.id}`} className="block flex-1">
              <div className="flex items-center gap-2">
                <Tag
                  className={cn(
                    "size-5 scale-x-[-1] transform stroke-[1.5]",
                    allowedColors[item.color as keyof typeof allowedColors]
                      .text,
                  )}
                />
                {item.name}
              </div>
            </Link>
            <LabelOptions label={item} />
          </div>
        )
      })}
      <LabelCreateUpdateForm type="create">
        <Button>Create</Button>
      </LabelCreateUpdateForm>
    </div>
  )
}
