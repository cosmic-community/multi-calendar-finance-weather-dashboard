import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/Navigation'
import { ThemeProvider } from '@/components/ThemeProvider'
import { CosmicBadge } from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Multi-Calendar Finance & Weather Dashboard',
  description: 'A comprehensive calendar and productivity dashboard supporting Solar, Lunar, and Gregorian calendars with multi-language support, financial tracking, and weather forecasting.',
  keywords: 'calendar, solar calendar, lunar calendar, gregorian calendar, persian, pashto, weather, expenses, currency',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js"></script>
      </head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <ThemeProvider>
          <div className="flex h-screen bg-background">
            <Navigation />
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
          <CosmicBadge bucketSlug={bucketSlug} />
        </ThemeProvider>
      </body>
    </html>
  )
}