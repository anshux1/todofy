import { MainNav } from "@/components/MainNav"

export default function LoginPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex h-screen flex-col">
      <MainNav />
      <div className="container-wrapper flex h-full flex-col gap-4 px-3 pt-20 min-[1400px]:border-x">
        {children}
      </div>
    </div>
  )
}
