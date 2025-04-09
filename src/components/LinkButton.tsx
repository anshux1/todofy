import Link from "next/link"
import { VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

export function LinkButton({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    href: string
    text: string
  }) {
  return (
    <Link href={props.href}>
      <Button className={cn(buttonVariants({ variant, size, className }))}>
        {props.text}
      </Button>
    </Link>
  )
}
