import Image from "next/image"

import { ShinyButton } from "@/components/ui/shiny-button"
import { Logo } from "@/components/Logo"
import { Navbar } from "@/components/Navbar"

export default function Home() {
  return (
    <div className="w-screen overflow-x-hidden px-2.5 md:px-5">
      <Navbar />
      <div className="relative flex h-[calc(100vh-5rem)] flex-col items-center justify-center space-y-4 rounded-3xl border text-center sm:space-y-7">
        <Logo
          size="xxl"
          className="z-0 rounded-3xl border bg-white p-4 shadow-2xl dark:bg-black"
        />
        <h1 className="z-0 text-center text-4xl tracking-tight sm:text-5xl md:text-7xl">
          Think, Plan, and <span className="text-sky-500">Track</span> <br />{" "}
          <span>all in one place</span>
        </h1>
        <h2 className="text-xs sm:text-sm md:text-xl">
          Efficiently manage your tasks and boost productivity
        </h2>
        <ShinyButton size="lg" className="z-20">
          Get Started
        </ShinyButton>
        <Image
          src="/right-top.png"
          alt="right-top"
          width={400}
          height={400}
          className="absolute top-10 right-0"
        />
      </div>
    </div>
  )
}
