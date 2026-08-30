import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-violet-100 text-violet-700 font-medium",
        secondary:
          "border-transparent bg-slate-100 text-slate-700 font-medium",
        destructive:
          "border-transparent bg-rose-100 text-rose-700 font-medium",
        outline: "border-border bg-sky-50 text-sky-700 font-medium",
        success:
          "border-transparent bg-emerald-100 text-emerald-700 font-medium",
        warning:
          "border-transparent bg-amber-100 text-amber-700 font-medium",
        info:
          "border-transparent bg-cyan-100 text-cyan-700 font-medium",
        purple:
          "border-transparent bg-purple-100 text-purple-700 font-medium",
        indigo:
          "border-transparent bg-indigo-100 text-indigo-700 font-medium",
        notification:
          "border-transparent bg-pink-100 text-pink-700 font-medium",
        blue:
          "border-transparent bg-blue-100 text-blue-700 font-medium",
        teal:
          "border-transparent bg-teal-100 text-teal-700 font-medium",
        orange:
          "border-transparent bg-orange-100 text-orange-700 font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
