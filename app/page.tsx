import { Suspense } from 'react'
import { CalendarWidget } from '@/components/CalendarWidget'
import { WeatherWidget } from '@/components/WeatherWidget'
import { ExpensesSummary } from '@/components/ExpensesSummary'
import { CurrencyWidget } from '@/components/CurrencyWidget'
import { RecentEvents } from '@/components/RecentEvents'
import { DashboardSkeleton } from '@/components/DashboardSkeleton'

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your multi-calendar productivity hub
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Calendar Widget */}
        <div className="lg:col-span-1">
          <Suspense fallback={<DashboardSkeleton type="calendar" />}>
            <CalendarWidget />
          </Suspense>
        </div>

        {/* Weather Widget */}
        <div className="lg:col-span-1">
          <Suspense fallback={<DashboardSkeleton type="weather" />}>
            <WeatherWidget location="Tehran" />
          </Suspense>
        </div>

        {/* Currency Widget */}
        <div className="lg:col-span-1">
          <Suspense fallback={<DashboardSkeleton type="currency" />}>
            <CurrencyWidget />
          </Suspense>
        </div>

        {/* Expenses Summary */}
        <div className="lg:col-span-2">
          <Suspense fallback={<DashboardSkeleton type="expenses" />}>
            <ExpensesSummary />
          </Suspense>
        </div>

        {/* Recent Events */}
        <div className="lg:col-span-1">
          <Suspense fallback={<DashboardSkeleton type="events" />}>
            <RecentEvents />
          </Suspense>
        </div>
      </div>
    </div>
  )
}