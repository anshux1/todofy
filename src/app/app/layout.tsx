import { UserDropdown } from "@/components/UserDropdown"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container-wrapper border-x">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="border-grid fixed top-14 z-30 hidden h-[calc(100vh)] w-full shrink-0 border-r md:sticky md:block">
          <UserDropdown />
          <div className="no-scrollbar mt-3 h-[calc(100%-4rem)] overflow-auto py-6 pr-4 lg:py-2"></div>
        </aside>
        <div className="">
          <div className="h-14 w-full border-b bg-red-50/10 md:hidden"></div>
          {children}
        </div>
      </div>
    </div>
  )
}
