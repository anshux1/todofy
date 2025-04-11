"use client"

import React, { useState } from "react"
import { usePathname } from "next/navigation"
import { Ellipsis, Heart, HeartOff, Pencil } from "lucide-react"
import { toast } from "sonner"

import { label } from "@prisma/client"
import { cn } from "@/lib/utils"
import { useAction } from "@/hooks/useAction"
import { toggleFavorite } from "@/actions/label"
import { LabelCreateUpdateForm } from "./LabelCreateUpdateForm"
import { LabelMoreOptions } from "./LabelMoreOptions"
import { LabelTooltip } from "./LabelTooltip"

export const LabelOptions = ({ label }: { label: label }) => {
  const pathname = usePathname()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { execute } = useAction(toggleFavorite, {
    onSuccess: (data) => toast(data),
  })

  const toggleLabelFavorite = () => {
    execute({
      id: label.id,
      currentPath: pathname,
      isFavorite: label.isFavorite,
    })
  }

  return (
    <div
      className={cn(
        "[&_svg]:hover:bg-secondary ml-auto hidden gap-2 group-hover:flex [&_svg]:size-6 [&_svg]:cursor-pointer [&_svg]:rounded-xs [&_svg]:stroke-[1.5] [&_svg]:p-[3px]",
        isDropdownOpen && "flex",
      )}
    >
      <LabelTooltip
        onClick={toggleLabelFavorite}
        text={label.isFavorite ? "Remove from favorite" : "Add to favorite"}
      >
        {label.isFavorite ? (
          <HeartOff role="button" />
        ) : (
          <Heart role="button" />
        )}
      </LabelTooltip>
      <LabelCreateUpdateForm type="update" label={label}>
        <Pencil />
      </LabelCreateUpdateForm>

      <LabelMoreOptions open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <Ellipsis />
      </LabelMoreOptions>
    </div>
  )
}
