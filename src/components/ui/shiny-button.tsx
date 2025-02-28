import { VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

export const ShinyButton = ({
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) => {
  return (
    <div className="group relative inline-block overflow-hidden rounded-md p-[1.3px]">
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0EA5E9_10%,#D4D4D8_50%,#0EA5E9_100%)] group-hover:animate-none" />
      <Button
        {...props}
        className={cn(
          "rounded-md bg-white text-lg font-medium text-zinc-800 backdrop-blur-2xl group-hover:scale-100 hover:bg-white dark:bg-zinc-950 dark:text-zinc-400",
          props.className,
        )}
      />
    </div>
  )
}
