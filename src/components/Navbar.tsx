import React from "react"
import Link from "next/link"

import { ShinyButton } from "@/components/ui/shiny-button"
import { Logo } from "./Logo"
import { ModeSwitcher } from "./mode-switcher"
import { Button } from "./ui/button"

const items = ["Features", "Solutions", "Resources", "Pricing"]

export const Navbar = () => {
  return (
    <div className="flex h-16 w-full items-center justify-between px-3.5 md:px-6">
      <div className="flex items-center gap-2">
        <Logo size="sm" />
        <h1 className='className="scroll-m-20 first:mt-0" text-2xl font-bold tracking-tight'>
          Todofy
        </h1>
      </div>
      <div className="hidden gap-2 md:flex">
        {items.map((item) => (
          <Button key={item} size={"sm"} variant="ghost">
            {item}
          </Button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <ModeSwitcher />
        <Link href="/signin">
          <Button className="text-primary" variant="ghost">
            Sign in
          </Button>
        </Link>
        <Link className="mt-1.5" href="/signup">
          <ShinyButton size="sm">Get Started</ShinyButton>
        </Link>
      </div>
    </div>
  )
}
