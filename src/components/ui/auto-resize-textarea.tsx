"use client"

import type React from "react"
import { useEffect, useRef, type ChangeEvent } from "react"

import { cn } from "@/lib/utils"

interface AutoResizeTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minRows?: number
}

export const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({
  minRows = 1,
  className,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const resizeTextarea = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  useEffect(() => {
    resizeTextarea()
  }, [])

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    resizeTextarea()
    if (props.onChange) {
      props.onChange(event)
    }
  }

  return (
    <textarea
      ref={textareaRef}
      onChange={handleChange}
      rows={minRows}
      className={cn(
        "w-full resize-none overflow-hidden bg-transparent",
        "focus:ring-0 focus:ring-offset-0 focus:outline-none",
        className,
      )}
      {...props}
    />
  )
}
