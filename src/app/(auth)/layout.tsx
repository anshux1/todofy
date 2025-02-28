import { Logo } from "@/components/Logo"

export default function LoginPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex h-screen max-w-6xl flex-col gap-6 p-6">
      <Logo textClassName="text-2xl" text="todofy" />
      <div className="flex h-full w-full flex-col justify-center gap-4">
        {children}
      </div>
    </div>
  )
}
