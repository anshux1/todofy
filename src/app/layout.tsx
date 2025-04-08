import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "@/styles/globals.css"

import RootProvider from "@/components/RootProvider"

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: "normal",
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Todofy",
  description:
    "Assign todos, manage tasks across your team, and stay organized. Create, track, and collaborate—all in one powerful tool.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
