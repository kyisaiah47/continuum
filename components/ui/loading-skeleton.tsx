export function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-white/[0.05] rounded w-1/4 mb-8"></div>
      <div className="space-y-4">
        <div className="h-4 bg-white/[0.05] rounded w-3/4"></div>
        <div className="h-4 bg-white/[0.05] rounded w-1/2"></div>
        <div className="h-4 bg-white/[0.05] rounded w-2/3"></div>
      </div>
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4"></div>
        <p className="text-white/60 text-sm">Loading...</p>
      </div>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-6 animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-12 w-12 rounded-full bg-white/[0.05]"></div>
        <div className="flex-1">
          <div className="h-4 bg-white/[0.05] rounded w-1/3 mb-2"></div>
          <div className="h-3 bg-white/[0.05] rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-white/[0.05] rounded w-full"></div>
        <div className="h-3 bg-white/[0.05] rounded w-4/5"></div>
      </div>
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 bg-white/[0.03] border border-white/[0.08] rounded-lg animate-pulse">
          <div className="h-10 w-10 rounded-full bg-white/[0.05]"></div>
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-white/[0.05] rounded w-1/4"></div>
            <div className="h-3 bg-white/[0.05] rounded w-1/3"></div>
          </div>
          <div className="h-8 w-24 bg-white/[0.05] rounded"></div>
        </div>
      ))}
    </div>
  )
}
