"use client"

import React from "react"
import { usePathname } from "next/navigation"

import { FeatureType } from "@prisma/client"
import { useAction } from "@/hooks/useAction"
import { Checkbox } from "@/components/ui/checkbox"
import { toggleFeature } from "@/actions/user"

interface QuickAddToggleProps {
  featureId: string
  shown: boolean
  type: FeatureType
}

export const QuickAddToggle = ({ featureId, shown }: QuickAddToggleProps) => {
  const pathname = usePathname()
  const { execute } = useAction(toggleFeature)
  return (
    <Checkbox
      checked={shown}
      onCheckedChange={(e) => {
        execute({ featureId, shown: !!e, currentPath: pathname })
      }}
      className="mr-2 cursor-pointer"
    />
  )
}
