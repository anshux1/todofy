"use client"

import React, { useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "./scroll-area"

export const SettingsLinks = () => {
  return (
    <ScrollArea className="mx-auto w-full max-w-3xl border-b">
      <Links />
      <ScrollBar className="hidden" orientation="horizontal" />
    </ScrollArea>
  )
}

type Position = {
  left: number
  width: number
  opacity: number
}
type SetPositon = React.Dispatch<React.SetStateAction<Position>>

export const SettingsTabs = [
  {
    label: "Quick add",
    href: "/settings/quick-add",
  },
  {
    label: "Notifications",
    href: "/settings/notifications",
  },
  {
    label: "Advanced",
    href: "/settings/advance",
  },
  {
    label: "Account",
    href: "/settings/account",
  },
]

const Links = () => {
  const pathname = usePathname()
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  })

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }))
      }}
      className="relative flex w-fit sm:gap-2"
    >
      {SettingsTabs.map((tab) => (
        <Link key={tab.label} href={tab.href}>
          <LinkItem
            className={`${pathname === tab.href ? "dark:border-primary border-b-2 pb-3" : ""} group`}
            setPosition={setPosition}
          >
            <p
              className={`${pathname === tab.href ? "dark:text-primary" : "text-muted-foreground"} group-hover:text-secondary dark:group-hover:text-primary`}
            >
              {tab.label}
            </p>
          </LinkItem>
        </Link>
      ))}
      <Cursor position={position} />
    </ul>
  )
}

const LinkItem = ({
  children,
  setPosition,
  className,
}: {
  children: React.ReactNode
  setPosition: SetPositon
  className?: string
}) => {
  const ref = useRef<HTMLLIElement>(null)

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return

        const { width } = ref.current.getBoundingClientRect()

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        })
      }}
      className={cn(
        "relative z-10 block cursor-pointer px-3.5 py-1.5 text-sm text-nowrap text-white mix-blend-difference sm:text-base",
        className,
      )}
    >
      {children}
    </li>
  )
}

const Cursor = ({ position }: { position: Position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="bg-secondary absolute z-0 h-9 rounded-sm"
    />
  )
}
