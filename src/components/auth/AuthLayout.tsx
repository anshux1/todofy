import Image from "next/image"

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LinkButton } from "@/components/LinkButton"

export function AuthLayout(props: {
  title: string
  description: string
  children: React.ReactNode
  imagePath: string
  type: "signin" | "signup"
}) {
  return (
    <div className="flex justify-between gap-5">
      <div className="mx-auto w-full max-w-sm">
        <CardHeader className="px-0">
          <CardTitle>{props.title}</CardTitle>
          <CardDescription>{props.description}</CardDescription>
        </CardHeader>
        {props.children}
        {props.type === "signup" && (
          <>
            <div className="text-muted-foreground mt-4 text-sm">
              By continuing with Google, Twitter, or Github, you agree to our{" "}
              <LinkButton
                text="Terms of Service "
                href="/terms"
                variant="link"
                className="p-0"
              />
              {" and "}
              <LinkButton
                className="p-0"
                variant="link"
                href="/privacy"
                text="Privacy Policy"
              />
            </div>
            <div className="bg-muted-foreground/40 mt-3 h-[0.5px] w-64" />
          </>
        )}
        <div className="text-muted-foreground mt-3 text-sm">
          {props.type === "signup"
            ? "Already have an account?"
            : "Don't have a account?"}{" "}
          <LinkButton
            className="p-0"
            variant="link"
            href={props.type === "signup" ? "/auth/signin" : "/auth/signup"}
            text={props.type === "signup" ? "Sign In" : "Sign Up"}
          />
        </div>
      </div>
      <div className="hidden w-2/4 items-center justify-center min-[900px]:flex">
        <Image
          className="scale-x-[-1]"
          src={props.imagePath}
          width={500}
          height={500}
          alt={`${props.type}-banner-image`}
        />
      </div>
    </div>
  )
}
