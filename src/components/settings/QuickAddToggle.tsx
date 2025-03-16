"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { refreshAtom } from "@/store/atoms"
import { useSetAtom } from "jotai"

import { FeatureType } from "@prisma/client"
import { useAction } from "@/hooks/useAction"
import { Checkbox } from "@/components/ui/checkbox"
import { toggleFeature } from "@/actions/quick-add"

interface QuickAddToggleProps {
  featureId: string
  shown: boolean
  type: FeatureType
}

export const QuickAddToggle = ({ featureId, shown }: QuickAddToggleProps) => {
  const setValue = useSetAtom(refreshAtom)
  const pathname = usePathname()
  const { execute } = useAction(toggleFeature)
  return (
    <Checkbox
      checked={shown}
      onCheckedChange={(e) => {
        execute({ featureId, shown: !!e, currentPath: pathname })
        setValue((prev) => prev + 1)
      }}
      className="mr-2 cursor-pointer"
    />
  )
}
