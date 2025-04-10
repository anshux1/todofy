import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth"
import { DEFAULT_REDIRECT, route } from "@/lib/auth/routes"

export async function middleware(request: NextRequest) {
  const { nextUrl } = request
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  console.log("Session", session)

  const isApiAuthRoute = nextUrl.pathname.startsWith(route.apiAuthPrefix)
  const isPublicRoute = route.publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = route.authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) return NextResponse.next()

  if (isAuthRoute || isPublicRoute) {
    if (session) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT, nextUrl))
    }
    return NextResponse.next()
  }

  if (!isPublicRoute && !session) {
    return NextResponse.redirect(new URL("/auth/signin", nextUrl))
  }
  return NextResponse.next()
}

export const config = {
  runtime: "nodejs",
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
}
