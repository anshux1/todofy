import React from "react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const LabelTooltip = (props: {
  text: string
  children?: React.ReactNode
  onClick?: () => void
}) => {
  return (
    <Tooltip>
      <TooltipTrigger onClick={props.onClick} asChild>
        {props.children}
      </TooltipTrigger>
      <TooltipContent className="px-2 py-1 text-xs">
        {props.text}
      </TooltipContent>
    </Tooltip>
  )
}
