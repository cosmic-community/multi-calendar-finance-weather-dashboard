interface DashboardSkeletonProps {
  type: 'calendar' | 'weather' | 'currency' | 'expenses' | 'events'
}

export function DashboardSkeleton({ type }: DashboardSkeletonProps) {
  switch (type) {
    case 'calendar':
      return (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="animate-pulse space-y-4">
            <div className="flex justify-between items-center">
              <div className="h-6 bg-muted rounded w-1/3"></div>
              <div className="h-8 bg-muted rounded w-1/4"></div>
            </div>
            <div className="h-6 bg-muted rounded w-1/2 mx-auto"></div>
            <div className="grid grid-cols-7 gap-1">
              {[...Array(42)].map((_, i) => (
                <div key={i} className="aspect-square bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      )

    case 'weather':
      return (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-muted rounded w-1/3"></div>
            <div className="h-20 bg-muted rounded"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-16 bg-muted rounded"></div>
              <div className="h-16 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      )

    case 'currency':
      return (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-muted rounded w-1/2"></div>
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 bg-muted rounded w-1/3"></div>
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )

    case 'expenses':
      return (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-20 bg-muted rounded"></div>
              <div className="h-20 bg-muted rounded"></div>
              <div className="h-20 bg-muted rounded"></div>
            </div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      )

    case 'events':
      return (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-muted rounded w-1/2"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-muted rounded"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )

    default:
      return (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </div>
        </div>
      )
  }
}