import * as React from "react"
import { cn } from "@/lib/utils"

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "frosted" | "morph" | "continuum"
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "morph", ...props }, ref) => {
    const variantStyles = {
      frosted: "glass-frosted", // Myn style
      morph: "glass-morph", // Ethos style
      continuum: "bg-[#16171D] border border-[#2A2B32]", // Continuum style
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl p-6 transition-all duration-300",
          variantStyles[variant],
          className
        )}
        {...props}
      />
    )
  }
)
GlassCard.displayName = "GlassCard"

export { GlassCard }
