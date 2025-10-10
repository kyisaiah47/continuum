"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Activity, Check } from "lucide-react"

export interface NetworkStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  blockNumber?: number
  integrity?: number
  validators?: number
  transactions?: number
}

const NetworkStatus = React.forwardRef<HTMLDivElement, NetworkStatusProps>(
  ({ className, blockNumber = 0, integrity = 99.97, validators = 47, transactions = 0, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-4 px-4 py-2 rounded-lg bg-[#16171D] border border-[#2A2B32]",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-mono text-muted-foreground">
            Block #{blockNumber.toLocaleString()}
          </span>
        </div>

        <div className="h-4 w-px bg-border" />

        <div className="flex items-center gap-2">
          <Check className="h-3 w-3 text-green-500" />
          <span className="text-xs text-muted-foreground">
            {integrity}% integrity
          </span>
        </div>

        <div className="h-4 w-px bg-border" />

        <div className="flex items-center gap-2">
          <Activity className="h-3 w-3 text-primary" />
          <span className="text-xs text-muted-foreground">
            {validators} validators
          </span>
        </div>

        {transactions > 0 && (
          <>
            <div className="h-4 w-px bg-border" />
            <Badge variant="secondary" className="text-xs">
              {transactions} txns
            </Badge>
          </>
        )}
      </div>
    )
  }
)
NetworkStatus.displayName = "NetworkStatus"

export { NetworkStatus }
