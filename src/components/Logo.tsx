import Link from "next/link"

import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl"
  text?: string
  textClassName?: string
}

export const Logo = ({
  className,
  size = "md",
  text,
  textClassName,
}: LogoProps) => {
  const sizeMap = {
    xs: {
      container: "gap-0.5",
      dot: "size-2",
      text: "text-sm",
      spacing: "gap-2",
    },
    sm: {
      container: "gap-0.5",
      dot: "size-3",
      text: "text-base",
      spacing: "gap-2.5",
    },
    md: {
      container: "gap-0.5",
      dot: "size-3.5",
      text: "text-lg",
      spacing: "gap-3",
    },
    lg: {
      container: "gap-1",
      dot: "size-4",
      text: "text-xl",
      spacing: "gap-3.5",
    },
    xl: {
      container: "gap-1",
      dot: "size-5",
      text: "text-2xl",
      spacing: "gap-4",
    },
    xxl: {
      container: "gap-1.5",
      dot: "size-7",
      text: "text-2xl",
      spacing: "gap-4",
    },
  }

  return (
    <Link href="/">
      <div
        className={cn("flex items-center", sizeMap[size].spacing, className)}
      >
        <div className={cn("grid grid-cols-2", sizeMap[size].container)}>
          <div
            className={cn(sizeMap[size].dot, "rounded-full bg-sky-500")}
          ></div>
          <div
            className={cn(
              sizeMap[size].dot,
              "rounded-full bg-gray-900 dark:bg-gray-50",
            )}
          ></div>
          <div
            className={cn(
              sizeMap[size].dot,
              "rounded-full bg-gray-900 dark:bg-gray-50",
            )}
          ></div>
          <div
            className={cn(
              sizeMap[size].dot,
              "rounded-full bg-gray-900 dark:bg-gray-50",
            )}
          ></div>
        </div>
        {text && (
          <span
            className={cn(
              sizeMap[size].text,
              "font-semibold text-gray-900 dark:text-gray-50",
              textClassName,
            )}
          >
            {text}
          </span>
        )}
      </div>
    </Link>
  )
}
