import Image from "next/image"
import Link from "next/link"

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Auth0 } from "@/components/auth/Auth0"
import { SigninForm } from "@/components/auth/SigninForm"

export default function page() {
  return (
    <div className="flex justify-between gap-5">
      <div className="mx-auto w-full max-w-sm">
        <CardHeader className="px-0">
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Sign in with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <Auth0 />
        <SigninForm />
        <Link href="/forgot-password">
          <button className="text-primary mt-4 cursor-pointer text-sm underline underline-offset-2">
            Forgot your password?
          </button>
        </Link>
        <div className="text-muted-foreground mt-3 text-sm">
          By continuing with Google, Twitter, or Github, you agree to our{" "}
          <Link href="/terms">
            <button className="text-primary cursor-pointer underline underline-offset-2">
              Terms of Service
            </button>
          </Link>{" "}
          and{" "}
          <Link href="/privacy">
            <button className="text-primary cursor-pointer underline underline-offset-2">
              Privacy Policy
            </button>
          </Link>
        </div>
        <div className="bg-muted-foreground/40 mt-3 h-[0.5px] w-64" />
        <div className="text-muted-foreground mt-3 text-sm">
          Already have an account?{" "}
          <Link href="/signup">
            <button className="text-primary cursor-pointer underline underline-offset-2">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
      <div className="hidden w-full items-center justify-center md:flex">
        <Image src="/svg/work2.svg" width={500} height={500} alt="work" />
      </div>
    </div>
  )
}
