"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import { Toaster } from "sonner"

import { TooltipProvider } from "@/components/ui/tooltip"

export default function RootProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableColorScheme
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
        <ToasterProvider />
      </ThemeProvider>
    </>
  )
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
const ToasterProvider = () => {
  const { resolvedTheme } = useTheme()
  return (
    <Toaster
      richColors
      theme={resolvedTheme as "light" | "dark" | "system"}
      position="bottom-right"
    />
  )
}
