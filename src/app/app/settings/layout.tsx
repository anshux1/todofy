"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { settingsTabLinks } from "@/constants/links"

import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="w-full pt-10">
      <nav className="border-b">
        <h1 className="text-4xl font-semibold">Settings</h1>
        <div className="mx-auto mt-3 max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-12 justify-between">
            <ScrollArea className="max-w-full">
              <div className="ml-0 flex h-12 space-x-8">
                {settingsTabLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className={cn(
                      "inline-flex items-center px-1 pt-1 text-sm leading-5 font-medium text-nowrap transition duration-150 ease-in-out focus:outline-none",
                      { "border-b-2 border-white": link.href === pathname },
                    )}
                    prefetch
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>
          </div>
        </div>
      </nav>
      {children}
    </div>
  )
}
