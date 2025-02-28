import Image from "next/image"
import Link from "next/link"

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Auth0 } from "@/components/auth/Auth0"
import { SignupForm } from "@/components/auth/SignupForm"

export default function LoginPage() {
  return (
    <div className="flex justify-between gap-5">
      <div className="mx-auto w-full max-w-sm">
        <CardHeader className="px-0">
          <CardTitle>Welcome</CardTitle>
          <CardDescription>
            Sign up with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <Auth0 />
        <SignupForm />
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
          <Link href="/signin">
            <button className="text-primary cursor-pointer underline underline-offset-2">
              Sign In
            </button>
          </Link>
        </div>
      </div>
      <div className="hidden w-full items-center justify-center md:flex">
        <Image
          src="/svg/work.svg"
          width={500}
          height={500}
          alt="work"
          className="scale-x-[-1]"
        />
      </div>
    </div>
  )
}
