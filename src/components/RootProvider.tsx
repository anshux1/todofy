"use client"

import { ReactNode } from "react"
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes"
import { Toaster } from "sonner"

export default function RootProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {children}
      <Toaster richColors position="top-center" />
    </ThemeProvider>
  )
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
