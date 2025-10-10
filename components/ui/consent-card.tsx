"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { Check, X, Clock, Calendar } from "lucide-react"

export interface ConsentRequest {
  id: string
  requesterName: string
  dataFields: string[]
  durationDays: number
  paymentAmount: number
  paymentToken: string
  timestamp: Date
  status: "pending" | "approved" | "rejected" | "expired"
}

interface ConsentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  request: ConsentRequest
  onApprove?: (id: string) => void
  onReject?: (id: string) => void
}

const ConsentCard = React.forwardRef<HTMLDivElement, ConsentCardProps>(
  ({ className, request, onApprove, onReject, ...props }, ref) => {
    const statusConfig = {
      pending: { icon: Clock, color: "bg-amber-500/10 text-amber-500 border-amber-500/20", label: "Pending" },
      approved: { icon: Check, color: "bg-green-500/10 text-green-500 border-green-500/20", label: "Approved" },
      rejected: { icon: X, color: "bg-red-500/10 text-red-500 border-red-500/20", label: "Rejected" },
      expired: { icon: Calendar, color: "bg-gray-500/10 text-gray-500 border-gray-500/20", label: "Expired" },
    }

    const StatusIcon = statusConfig[request.status].icon

    return (
      <GlassCard
        ref={ref}
        variant="morph"
        className={cn("hover-glow animate-slide-in-up", className)}
        {...props}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">{request.requesterName}</h3>
            <p className="text-sm text-muted-foreground">
              {request.timestamp.toLocaleDateString()} · {request.timestamp.toLocaleTimeString()}
            </p>
          </div>
          <Badge variant="outline" className={cn("gap-1.5", statusConfig[request.status].color)}>
            <StatusIcon className="h-3 w-3" />
            {statusConfig[request.status].label}
          </Badge>
        </div>

        <div className="space-y-3 mb-4">
          <div>
            <p className="text-sm font-medium mb-2">Requested Data Fields:</p>
            <div className="flex flex-wrap gap-2">
              {request.dataFields.map((field) => (
                <Badge key={field} variant="secondary" className="text-xs">
                  {field}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="text-sm font-medium">{request.durationDays} days</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Payment</p>
              <p className="text-sm font-medium">
                {request.paymentAmount} {request.paymentToken}
              </p>
            </div>
          </div>
        </div>

        {request.status === "pending" && (
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              variant="default"
              className="flex-1 bg-primary hover:bg-primary/90"
              onClick={() => onApprove?.(request.id)}
            >
              <Check className="mr-2 h-4 w-4" />
              Approve
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/10"
              onClick={() => onReject?.(request.id)}
            >
              <X className="mr-2 h-4 w-4" />
              Reject
            </Button>
          </div>
        )}

        {request.status === "approved" && (
          <div className="pt-2">
            <p className="text-xs text-muted-foreground">
              Access valid for {request.durationDays} days from approval
            </p>
          </div>
        )}
      </GlassCard>
    )
  }
)
ConsentCard.displayName = "ConsentCard"

export { ConsentCard }
