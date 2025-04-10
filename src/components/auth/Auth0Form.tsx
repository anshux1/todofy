"use client"

import Image from "next/image"
import { toast } from "sonner"

import { authClient } from "@/lib/auth.config"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type Provider = "google" | "github" | "twitter"

export function Auth0Form() {
  const handleAuth = async (provider: Provider) => {
    await authClient.signIn.social(
      { provider, callbackURL: "/overview" },
      {
        onSuccess: () => {
          toast.success("Sign up successfully")
        },
        onError: (error) => {
          console.log(error)
          toast.error(error.error.message)
        },
      },
    )
  }

  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-4">
        <Auth0Button provider="google" onClick={() => handleAuth("google")} />
        <Auth0Button provider="github" onClick={() => handleAuth("github")} />
        <Auth0Button provider="twitter" onClick={() => handleAuth("twitter")} />
      </div>
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2">
          Or continue with
        </span>
      </div>
    </div>
  )
}

const Auth0Button = (props: { onClick: () => void; provider: Provider }) => {
  return (
    <Button
      size="lg"
      type="submit"
      variant="outline"
      className="w-full"
      onClick={props.onClick}
    >
      <Image
        className={cn(props.provider !== "google" && "dark:invert")}
        src={`/social/${props.provider}.svg`}
        alt={`${props.provider}-logo`}
        width={20}
        height={20}
      />
      Continue with{" "}
      {props.provider.charAt(0).toUpperCase() + props.provider.slice(1)}
    </Button>
  )
}
