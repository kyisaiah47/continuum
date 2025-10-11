import { AlertCircle, RefreshCw } from "lucide-react"
import { ButtonPurple } from "./plural"

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  title = "Something went wrong",
  message = "We encountered an error loading this content. Please try again.",
  onRetry
}: ErrorStateProps) {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
          <AlertCircle className="h-8 w-8 text-red-400" />
        </div>
        <h3 className="text-2xl font-light text-white mb-3">{title}</h3>
        <p className="text-base text-white/50 mb-6">{message}</p>
        {onRetry && (
          <ButtonPurple onClick={onRetry} className="h-11 px-6">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </ButtonPurple>
        )}
      </div>
    </div>
  )
}

export function EmptyState({
  title = "No data yet",
  message = "Get started by adding your first item.",
  icon: Icon = AlertCircle,
  action
}: {
  title?: string
  message?: string
  icon?: React.ComponentType<{ className?: string }>
  action?: React.ReactNode
}) {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
          <Icon className="h-8 w-8 text-white/40" />
        </div>
        <h3 className="text-2xl font-light text-white mb-3">{title}</h3>
        <p className="text-base text-white/50 mb-6">{message}</p>
        {action}
      </div>
    </div>
  )
}
