"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme()

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }, [resolvedTheme, setTheme])

  return (
    <Button
      variant="ghost"
      className="group/toggle size-9 px-0"
      onClick={toggleTheme}
    >
      <SunIcon className="hidden size-5 [html.dark_&]:block" />
      <MoonIcon className="hidden size-5 [html.light_&]:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
